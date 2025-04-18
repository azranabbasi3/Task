const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const randomNumber = 10;

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const enc_password = await bcrypt.hash(password, randomNumber);
    const user = await User.create({ name, email, password: enc_password });
    res
      .status(201)
      .json({ success: true, message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });
    res.status(200).json({
      success: true,
      data: user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

const logout = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.token = null;
    await user.save();

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Logout failed. Please try again later." });
  }
};

const getProfile = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      data: user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error getting user",
    });
  }
};
module.exports = { register, login, getProfile, logout };
