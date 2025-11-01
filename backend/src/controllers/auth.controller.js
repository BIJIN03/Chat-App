import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { generateToken } from "../lib/utils.js";
export const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password should be atleast 8 characters!" });
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format!." });
    }
    const name = name.trim()
    const email = email.toLowerCase()
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User with the email already exists!" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      name,
      password: hashedPassword,
    });
    if (newUser) {
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "SignUp failed!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
    console.log("Error occured.", error);
  }
};
