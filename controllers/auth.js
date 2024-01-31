import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { handleErrors } from "../utils/routerUtils.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

//Sign Up Function Used To Create New User In SignUp End Point
export const signUp = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return handleErrors(res, 400, errors.array()[0].msg, false);
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        resMSG:
          "User with this email already exists. Please enter a unique email.",
      });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    await User.create({
      name: req.body.name,
      password: hashedPassword,
      email: req.body.email,
    });

    return res.json({
      message: "Registration Done Successfully",
      success: true,
    });
  } catch (error) {
    return handleErrors(
      res,
      500,
      "Internal Server error occurred. Please try again.",
      false
    );
  }
};

//Sign In Function Used In Login End Point
export const signIn = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return handleErrors(res, 400, errors.array()[0].msg, false);
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return handleErrors(res, 400, "Please enter valid credentials.", false);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return handleErrors(res, 400, "Please enter valid credentials.", false);
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETE);

    res.json({ success: true, message: "Login successful", token });
  } catch (error) {
    return handleErrors(
      res,
      500,
      "Internal Server error occurred. Please try again.",
      false
    );
  }
};

//Fetch User Function
export const getUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    return handleErrors(
      res,
      500,
      "Internal Server error occurred. Please try again.",
      false
    );
  }
};
