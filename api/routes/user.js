const express = require("express");
const { register, login, profile } = require("../controllers/user");
const authMiddleware = require("../middleware/auth");
const userRouter = express.Router();
userRouter.post("/register", register);
userRouter.post("/login", login);

userRouter.get("/profile", authMiddleware, profile);
module.exports = userRouter;
