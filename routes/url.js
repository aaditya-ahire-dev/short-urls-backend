import express from "express";
import {
  getAllUrls,
  handleGetUrl,
  handlecreateNewUrl,
  handleAnalysisUrl,
  handleDeleteUrl,
} from "../controllers/url.js";

const router = express.Router();
router.get("/getallurls", getAllUrls);
router.post("/geturl", handlecreateNewUrl);
router.get("/:shortId", handleGetUrl);
router.get("/analysis/:shortId", handleAnalysisUrl);
router.delete("/delete/:shortId", handleDeleteUrl);

export default router;
