import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../Models/userModel.js";
import { hashPassword } from "./../helper/authHelper.js";

export const registerController = async (req, res) => {
  try {
    // Check if required fields are provided
    const { name, email, password, answer } = req.body;
    if (!name) return res.send({ error: "name is required" });
    if (!email) return res.send({ error: "email is required" });
    if (!password) return res.send({ error: "password is required" });
    if (!answer) return res.send({ error: "answer is required" });
    // Check if the user with the same email already exists
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      res.status(200).send({
        success: true,
        message: "Already register please login",
      });
    }

    // Hash the provided password
    const hashedPassword = await hashPassword(password);
    // Create a new user instance
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      answer,
    });
    // Save the new user to the database
    await user.save();
    // Send a success response
    res.status(201).send({
      success: true,
      message: "user register successfully",
      user,
    });
    // Send an error response in case of any issues
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "error in registration" });
  }
};
//  Login a user.
export const loginController = async (req, res) => {
  try {
    // Extract user credentials from the request body
    const { email, password } = req.body;
    // Check if email and password are provided
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "please enter your email and password",
      });
    }
    // Find the user with the provided email
    const user = await userModel.findOne({ email });
    // Check if the user exists
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not registered",
      });
    }
    // Compare the provided password with the stored hashed password
    const match = await compare(password, user.password);
    // Check if the passwords match
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "password mismatch",
      });
    }
    // Create a JSON Web Token (JWT) for authentication
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    // Send a success response with the user's information and token
    res.status(200).send({
      success: true,
      message: "successfully login",
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
    // Send an error response in case of any issues
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error while in login ",
      error,
    });
  }
};
// forgot-password controller
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      return res.status(400).send({
        message: "Email is required",
      });
    }
    if (!answer) {
      return res.status(400).send({
        message: "Answer is required",
      });
    }
    if (!newPassword) {
      return res.status(400).send({
        message: "New Password is required",
      });
    }
    // check
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong email or password",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};
