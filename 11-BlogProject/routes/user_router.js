const express = require("express");
const {
  getSignup,
  postSignup,
  getSignin,
  postSignin,
  getLogout,
} = require("../controller/user_controller");
const { signupValidation } = require("../middleware/userValidation");

const userRouter = express.Router();

userRouter.get("/signup", getSignup);
userRouter.post("/signup",signupValidation, postSignup);
userRouter.get("/signin", getSignin);
userRouter.post("/signin", postSignin);
userRouter.get('/logout',getLogout);

module.exports = userRouter;
