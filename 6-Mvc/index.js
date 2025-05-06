const express = require("express");
const { default: mongoose } = require("mongoose");
const { userRouter, userDetailRouter } = require("./Routes/user_router");

const app = express();

app.use(express.urlencoded({ extended: false })); //body parser middleware

app.use(userDetailRouter);
//Rest Api.....................................................................................//
app.use("/api", userRouter);
//.................................................................................................//

const db_path =
  "mongodb+srv://sagargautam389:sagargautam389@usercluster.tmvdaad.mongodb.net/userdetail?retryWrites=true&w=majority&appName=userCluster";
const PORT = 3001;

mongoose
  .connect(db_path)
  .then(() => {
    console.log("Database Started............");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("error occur while database connection:", err);
  });
