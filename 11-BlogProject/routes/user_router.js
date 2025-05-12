const express = require("express");
const {
  getSignup,
  postSignup,
  getSignin,
  postSignin,
} = require("../controller/user_controller");

const userRouter = express.Router();

userRouter.get("/signup", getSignup);
userRouter.post("/signup", postSignup);
userRouter.get("/signin", getSignin);
userRouter.post("/signin", postSignin);

module.exports = userRouter;
