import express from "express";
import {
  getAllUrls,
  handleGetUrl,
  handlecreateNewUrl,
  handleAnalysisUrl,
  handleDeleteUrl,
} from "../controllers/url.js";
import { checkAuthentication } from "../middleware/auth.js";
const router = express.Router();
router.get("/getallurls",checkAuthentication, getAllUrls);
router.post("/geturl",checkAuthentication, handlecreateNewUrl);
router.get("/:shortId", handleGetUrl);
router.get("/analysis/:shortId",checkAuthentication, handleAnalysisUrl);
router.delete("/delete/:shortId",checkAuthentication, handleDeleteUrl);

export default router;
