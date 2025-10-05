import { setId, getId } from "../servies/auth.js";

// For Authentication
export function checkAuthentication(req, res, next) {
  try {
    const token = req.cookies?.token;
    req.user = null;
    if (!token) {
      const err = new Error("Token is missing");
      err.statusCode = 401;
      throw err;
    }
    const user = getId(token);
    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 401;
      throw err;
    }
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message, success: false });
  }
}
export function checkAdminAuthentication(req, res, next) {
  try {
    const token = req.cookies?.Admin_token;
    
    req.user = null;
    if (!token) {
      const err = new Error("Token is missing");
      err.statusCode = 401;
      throw err;
    }
    const user = getId(token);
    if (!user) {
      const err = new Error("Admin not found");
      err.statusCode = 401;
      throw err;
    }
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message, success: false });
  }
}

// For restricting the routes
export function restrictTo(roles) {
  return function (req, res, next) {
    try {
      if (!req.user) {
        const err = new Error(
          "Can't recognize who you are. Please log in again."
        );
        err.statusCode = 401;
        throw err;
      }

      if (!roles.includes(req.user.role)) {
        const err = new Error("You are not autherized to access this page.");
        err.statusCode = 401;
        throw err;
      }
    } catch (error) {
      return res
        .status(error.statusCode || 500)
        .json({ message: error.message, success: false });
    }

    next();
  };
}
