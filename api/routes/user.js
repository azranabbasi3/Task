const express = require("express");
const { register, login, getUser, logout, getProfile } = require("../controllers/user");
const authMiddleware = require("../middleware/auth");
const userRouter = express.Router();
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout",authMiddleware, logout);
userRouter.get("/getProfile/:email",authMiddleware, getProfile);
module.exports = userRouter;
