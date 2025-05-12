const path = require("path");
const express = require("express");
const homeRouter = require("./routes/home_router");
const userRouter = require("./routes/user_router");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(homeRouter);
app.use('/user',userRouter);

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
