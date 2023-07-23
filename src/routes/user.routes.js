const express = require("express");
const {
  register,
  login,
  getProfile,
  sendVerification,
  verifyUser,
} = require("../controller/user.controller");
const { verifyAuthTokenMiddleware } = require("../middleware/authenticate");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/profile", verifyAuthTokenMiddleware, getProfile);
userRouter.post("/sendVerification", sendVerification);
userRouter.post("/verifyUser", verifyUser);
module.exports = userRouter;
