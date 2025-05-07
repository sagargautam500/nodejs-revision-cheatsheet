const express = require("express");
const connectToMongoDb = require("./connect");
const urlRouter = require("./routes/url_router");

const app = express();
// app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 

app.use("/api/url", urlRouter);

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
