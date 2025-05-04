const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();
  // console.log('query:',req.query)

  const myUrl = url.parse(req.url, true);
  // console.log("url is:", myUrl);
  // console.log(req.body,req.method,req.url);
  let log = `${Date.now()}:${req.url}:New Request Received..\n`;

  fs.appendFile("log.txt", log, () => {
    switch (myUrl.pathname) {
      case "/":
        res.end("Hello from server......");
        break;
      case "/about":
        let name=myUrl.query.name;
        let id=myUrl.query.id;
            // console.log(name)
        res.end(  `hi ,${name} and id is ${id}`);
        break;
      default:
        res.end("404 Page Not Found");
    }
  });
});

server.listen(3000, () =>
  console.log("server started at http://localhost:3000")
);
