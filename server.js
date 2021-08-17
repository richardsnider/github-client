const filesystem = require('fs');
const http = require('http');

const githubUsername = process.env.GITHUB_USERNAME;
const githubUsernameIsSet = githubUsername && typeof (githubUsername) === `string`  && githubUsername.trim() !== ``;
if(!githubUsernameIsSet) throw new Error(`GITHUB_USERNAME environment variable is not set.`);

const linkedinUsername = process.env.LINKEDIN_USERNAME;
const linkedinUsernameIsSet = linkedinUsername && typeof (linkedinUsername) === `string`  && linkedinUsername.trim() !== ``;
if(!linkedinUsernameIsSet) throw new Error(`LINKEDIN_USERNAME environment variable is not set.`);

const indexHTMLContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <script>
      window.env = {};
      window.env.GITHUB_USERNAME = "${githubUsername}";
      window.env.LINKEDIN_USERNAME = "${linkedinUsername}";
    </script>
    <script src="./main.js"></script>
  </head>
  <body></body>
</html>
`;

filesystem.writeFileSync(`./dist/index.html`, indexHTMLContent, `utf8`);
filesystem.copyFileSync(`./src/styles.css`, `./dist/styles.css`);

/** @type {http.RequestListener} */
const serve = (request, response) => {
  let requestedFileData;
  try {
    const urlFilePath = request.url.split(`?`)[0];
    if(urlFilePath === `/`) urlFilePath = `/index.html`;
    //TODO: fix subsequent request for '/' that doesn't seem to be forwarding to '/index.html'
    console.log(`Request URL is: ${urlFilePath}`);
    requestedFileData = filesystem.readFileSync(`./dist${urlFilePath}`);
  } catch (error) {
    response.writeHead(404);
    response.end(`The requested URL ${request.url} was not found on this server.`);
    return;
  }

  if(request.url === `/styles.css`) response.setHeader(`Content-Type`, `text/css`);
  response.writeHead(200);
  response.end(requestedFileData);
};

const listeningPort = process.env.NODE_LISTENER_PORT || 8080;
http.createServer(serve).listen(listeningPort);
console.log(`listening on port ${listeningPort}`);
