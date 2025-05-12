const path = require("path");
const express = require("express");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get('/',(req, res) => {
  console.log(req.method,req.url,req.headers.host)
  res.render("home");
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
