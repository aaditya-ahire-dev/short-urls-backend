import express from "express";
import URL from "../models/url.js";
import { checkAdminAuthentication, restrictTo } from "../middleware/auth.js";
import {
  createAdmin,
  getAllUrls,
  urlDetails,
  loginAdmin
} from "../controllers/adminController.js";

const router = express.Router();

router.route("/signup").post(createAdmin);
router.post("/login", loginAdmin);
router.get("/getallurls", checkAdminAuthentication ,restrictTo(["ADMIN"]), getAllUrls);
router.post("/urlDetails",checkAdminAuthentication, restrictTo(["ADMIN"]), urlDetails);

export default router;
