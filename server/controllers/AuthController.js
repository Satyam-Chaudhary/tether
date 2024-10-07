import { compare } from "bcrypt";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import { renameSync, unlinkSync } from "fs";

const maxAge = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

export const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = await User.create({ email, password });
    res.cookie("jwt", createToken(email, user.id), {
      httpOnly: true,
      maxAge,
      sameSite: "None",
      secure: true,
    });

    return res.status(201).json({
      user: {
        email: user.email,
        id: user.id,
        profileSetup: user.profileSetup,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required." });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User with given email does not exist");
    }

    const auth = await compare(password, user.password);

    if (!auth) {
      return res.status(400).send("Invalid password");
    }

    res.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });
    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        color: user.color,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserInfo = async (req, res, next) => {
  try {
    // console.log(req.userId);
    const userData = await User.findById(req.userId);
    //console.log(userData);
    if (!userData) {
      return res.status(404).send("User with given id not found");
    }
    return res.status(200).json({
      user: {
        id: userData.id,
        email: userData.email,
        profileSetup: userData.profileSetup,
        firstName: userData.firstName,
        lastName: userData.lastName,
        image: userData.image,
        color: userData.color,
      },
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { userId } = req;
    const { firstName, lastName, color } = req.body;
    if (!firstName || !lastName || !color) {
      return res.status(400).send("Please provide all the fields");
    }

    const userData = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        color,
        profileSetup: true,
      },
      {
        new: true, // new:true returns the updated document
        runValidators: true, // runValidators:true will validate the update operation
      }
    );

    return res.status(200).json({
      user: {
        id: userData.id,
        email: userData.email,
        profileSetup: userData.profileSetup,
        firstName: userData.firstName,
        lastName: userData.lastName,
        image: userData.image,
        color: userData.color,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addProfileImage = async (req, res, next) => {
  try {
    const { userId } = req;
    if (!req.file) {
      // if no file is uploaded
      return res.status(400).send("Please upload an image file");
    }
    //console.log(req.file.path);
    const date = Date.now();
    let fileName = "uploads/profiles/" + date + req.file.originalname;
    renameSync(req.file.path, fileName);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { image: fileName },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      user: {
        image: updatedUser.image,
      },
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const removeProfileImage = async (req, res, next) => {
  const { userId } = req;
  const user = await User.findById(userId);

  if (!user.image) {
    return res.status(400).send("No image to delete");
  }

  unlinkSync(user.image);
  user.image = null;

  await user.save(); // save the updated user

  return res.status(200).send("Image deleted successfully");
};

export const logout = async (req, res, next) => {
  try{
    res.clearCookie('jwt'); // clear the cookie
    return res.status(200).send("Logged out successfully");
  }catch(err){
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
