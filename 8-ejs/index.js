const express = require("express");
const path = require("path");
const connectToMongoDb = require("./connect");
const urlRouter = require("./routes/url_router");

const app = express();
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());
//..................................................for ejs middleware.................
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
//...............................................................................

app.use("/api/url", urlRouter); //handle routing middleware      
 
connectToMongoDb()
  .then(() => {
    console.log("database connected...!");
  })
  .catch((err) => {
    console.log("error occur while connect to database:", err);
  });

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
