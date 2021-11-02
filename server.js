const filesystem = require('fs');
const http = require('http');

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
