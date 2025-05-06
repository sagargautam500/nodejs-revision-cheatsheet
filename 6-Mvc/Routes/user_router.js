const express = require("express");
const {
  getAllUser,
  getSingleUser,
  postUserData,
  patchUserData,
  deleteUserData,
  getHome,
  getDetails,
} = require("../Controller/user_controller");

const userRouter = express.Router();
const userDetailRouter = express.Router();

userRouter.get("/users", getAllUser);
userRouter.post("/users", postUserData);
// userRouter.get("/users/:id", getSingleUser);
// userRouter.patch("/users/:id", patchUserData);
// userRouter.delete("/users/:id", deleteUserData);
userRouter
  .route("/users/:id")
  .get(getSingleUser)
  .patch(patchUserData)
  .delete(deleteUserData);

userDetailRouter.get("/", getHome);
userDetailRouter.get("/users", getDetails);

module.exports = { userRouter, userDetailRouter }; 
