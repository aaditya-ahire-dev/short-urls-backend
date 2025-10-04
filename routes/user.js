import express from "express";
import {checkAuthentication} from "../middleware/auth.js"
import {
  handleSignUpUser,
  handleLoginInUser,
} from "../controllers/user.js";
const router = express.Router();

router.route("/login").post(handleLoginInUser)
router.route("/signup").post(handleSignUpUser)


export default router;
