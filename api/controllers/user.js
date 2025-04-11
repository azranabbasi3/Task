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
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    if (!bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const result = {
      user,
      token,
    };
    res.status(200).json({ message: "Login successful", result });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

const profile = async (req, res) => {
  try {
    res.status(200).json({ message: "Profile fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: "Profile fetch failed" });
  }
};

module.exports = { register, login, profile };
