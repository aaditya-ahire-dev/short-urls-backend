import URL from "../models/url.js";
import User from "../models/user.js";
import { setId } from "../servies/auth.js";
import bcrypt from 'bcrypt'
export async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email: email });
    if (!user) {
      const err = new Error("Email or Password is Incorrect");
      err.statusCode = 404;
      throw err;
    }
     const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          const err = new Error("Email or Password is Incorrect");
            err.statusCode = 404;
            throw err;
        }
    

    if (user.role === "ADMIN") {
      const token = setId(user);
      const admin = {
        name: user.name,
        email: user.email,
      };
      
      res.cookie("Admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      });
      
      return res
        .status(200)
        .json({ message: "You are authorized", success: true, Admin: admin });
    }else{
       const err = new Error("You are not authorized");
        err.statusCode = 404;
        throw err;
    }
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message,
      success: false,
    });
  }
}

export async function createAdmin(req, res) {
  try {
    const { name, email, password } = req.body;

    const checkEmail = await User.findOne({ email: email });
    if (checkEmail?.role == "ADMIN") {
      const err = new Error("This email Already Exists");
      err.statusCode = 409;
      throw err;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdAdmin = await User.create({
      name,
      email,
      password:hashedPassword,
      role: "ADMIN",
    });
    return res
      .status(200)
      .json({
        mess: "admin created Successfully",
        success: true,
        Admin: {
            name: createdAdmin.name,
            email:createdAdmin.email
        },
      });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message, success: false });
  }
}

export async function getAllUrls(req, res) {
  try {
    const userUrls = await URL.find({}).populate("createdBy");
    if (!userUrls) {
      return res.json({ message: "No Urls Exists", success: true });
    }

    return res
      .status(200)
      .json({ mess: "Url fetch successfully", success: true, URLS: userUrls });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "some Error occured", success: false });
  }
}

export async function urlDetails(req, res) {
  try {
    const query = req.body.query;
    if (query.includes("@")) {
      const user = await User.findOne({ email: query });
      if (!user) {
        const err = new Error("user dose not exist");
        err.statusCode = 404;
        throw err;
      }
      const userUrl = await URL.find({ createdBy: user._id }).populate(
        "createdBy"
      );
      if (!userUrl)
        return res.json({
          message: "Urls not found or user haven't created any yet",
          success: true,
        });
      return res
        .status(200)
        .json({ message: "Found the URL's", success: true, URLS: userUrl });
    } else if (query.startsWith("http://") || query.startsWith("https://")) {
      const urldetails = await URL.find({ OriginalURL: query }).populate(
        "createdBy"
      );
      
      if (urldetails.length > 0) {
        return res
          .status(200)
          .json({
            message: "Urls not found or user haven't created any yet",
            success: true,
            URLS: urldetails,
          });
        } else {
            const shortUrl = query.split("/");
            const shortID = shortUrl[shortUrl.length - 1];
            const shorturldetails = await URL.find({ shortId: shortID }).populate(
                "createdBy"
            );
        
        if (!shorturldetails.length) {
          return res.json({
            message: "Urls not found or user haven't created any yet",
            success: true,
          });
        }
        return res
          .status(200)
          .json({
            message: "URL's fetch successfully",
            success: true,
            URLS: shorturldetails,
          });
      }
    } else {
      const urldetails = await URL.find({ shortId: query }).populate(
        "createdBy"
      );
      if (urldetails.length === 0)
        return res.json({ message: "URL not exist", success: true });
      return res.status(200).json({ mess: "Done", URLS: urldetails });
    }
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message,
      success: true,
    });
  }
}
