import express from "express";
import User from "../models/user.js";
import { setId, getId } from "../servies/auth.js";
import { v4 as uuidv4 } from "uuid";

export async function handleSignUpUser(req, res) {
  try {
    const { name, email, password } = req.body;
    
    const checkEmail = await User.findOne({ email: email });

    if (checkEmail?.role == "NORMAL") {
      const err = new Error("Email Already Exists");
      err.statusCode = 409;
      throw err;
    }
    const result = await User.create({
      name,
      email,
      password,
    });
    console.log(result);
    
    const user = {
      name:result.name,
      email:result.email
    }
    
    
    const token = setId(result);
    res.cookie("token", token , {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });  
    return res.status(200).json({ message: "User Created Successfully", success: true, user: user  });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message, success: false });
  }
}
export async function handleLoginInUser(req, res) {
  try {
    
    const { email, password } = req.body;
    const user = await User.findOne({
      email: `${email}`,
      password: `${password}`,
    });
    if (!user) {
      const err = new Error("Email or Password is Incorrect");
      err.statusCode = 404;
      throw err;
    }
    const token = setId(user);
    const userInfo = {
      name: user.name,
      email: user.email,
    };
    console.log("hiii",token);
    console.log(user);

    res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
    return res.status(200).json({ mess: "You are authorized", success:true , user: userInfo });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
        message:error.message,
        success:false
    })
  }
}
