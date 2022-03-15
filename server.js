const filesystem = require('fs');
const http = require('http');

const indexHTMLContent = filesystem.readFileSync(`./dist/index.html`, { encoding: `utf8` })
  .replace(`__GITHUB_USERNAME__`, process.env.GITHUB_USERNAME)
  .replace(`__LINKEDIN_USERNAME__`, process.env.LINKEDIN_USERNAME)

/** @type {http.RequestListener} */
const serve = (request, response) => {
  let responseData;
  try {
    const urlFilePath = request.url.split(`?`)[0];
    console.log(`Request URL is: ${urlFilePath}`);

    if (urlFilePath === `/` || urlFilePath === `/index.html`) responseData = indexHTMLContent;
    else {
      try {
        responseData = filesystem.readFileSync(`./dist${urlFilePath}`);
      } catch (error) {
        response.writeHead(404);
        response.end(`The requested URL ${request.url} was not found on this server.`);
        return;
      }
    }

    if (request.url === `/styles.css`) response.setHeader(`Content-Type`, `text/css`);
    response.writeHead(200);
    response.end(responseData);
  } catch (error) {
    console.log(`Request URL is: ${urlFilePath}`);
    response.writeHead(500);
    response.end(`500 Internal Server Error`);
    return;
  }
};

const listeningPort = process.env.NODE_LISTENER_PORT || 8080;
http.createServer(serve).listen(listeningPort);
console.log(`listening on port ${listeningPort}`);
