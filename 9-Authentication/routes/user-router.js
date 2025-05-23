const express = require("express");
const {
  getSignUp,
  postSignUp,
  getLogin,
  postLogin,
  postLogout,
} = require("../controller/user-controller");

const userRouter = express.Router();
userRouter.get("/signup", getSignUp);
userRouter.post("/signup", postSignUp);
userRouter.get("/login", getLogin);
userRouter.post("/login", postLogin);
userRouter.post("/logout", postLogout);

module.exports = userRouter;
