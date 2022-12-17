import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

const secret = "test";

// @desc        create user
// @route       /user/signup
export const SignUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let OldUser = await UserModel.find({ email });
    if (OldUser.length > 0) {
      res.status(400).json({
        status: "Users email already exists.",
      });
    } else {
      const hashPassword = await bcrypt.hash(password, 12);
      await UserModel.create({
        name,
        email,
        password: hashPassword,
      });
      res.status(201).json({
        // user,
        status: "successs",
        message: "User created",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

// @desc        login user
// @route       /user/signin
export const SignIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const OldUser = await UserModel.findOne({ email });
    if (!OldUser) {
      return res.status(404).json({
        status: "User dosen't exists",
      });
    }
    const isCorrectPassword = await bcrypt.compare(password, OldUser.password);
    if (!isCorrectPassword) {
      return res.status(404).json({
        status: "Invalid password",
      });
    }
    const token = jwt.sign({email: OldUser.email, id: OldUser._id}, secret)
      res.status(200).json({
        token,
        status: "success"
      });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};
