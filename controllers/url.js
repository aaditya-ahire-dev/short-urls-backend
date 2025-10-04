import express from "express";
import URL from "../models/url.js";
import shortId from "shortid";

export async function getAllUrls(req, res) {
  try {
    const allurls = await URL.find({ createdBy: req.user._id }).populate(
      "createdBy"
    );
    if (allurls < 0) {
      return res.status(200).json({
        message: "No URLs found for this user",
        success: true,
        URLS: allurls,
      });
    }
    return res.status(200).json({
      message: "URLs fetched successfully",
      success: true,
      URLS: allurls,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", success: false });
  }
}

export async function handlecreateNewUrl(req, res) {
  try {
    const body = req.body;
    console.log(body);
    
    const shortID = shortId();
    if (!body.url) {
      const err = new Error("URL is required");
      err.StatusCode = 400;
      throw err;
    }
    const result = await URL.create({
      shortId: shortID,
      OriginalURL: body.url,
      visitHistory: [],
      createdBy: req.user._id,
    });
    return res.status(200).json({
      message: "Url Created Successfully",
      success: true,
      URLS: result,
    });
  } catch (error) {
    return res.status(error.StatusCode || 500).json({
      message: error.message,
      success: false,
    });
  }
}

export async function handleGetUrl(req, res) {
  try {
    const url_shortId = req.params?.shortId;
    const result = await URL.findOneAndUpdate(
      { shortId: `${url_shortId}` },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      },
      { returnDocument: "after" }
    );
    if (!result) {
      const err = new Error("URL not found");
      err.StatusCode = 404;
      throw err;
    } else {
      res.redirect(result.OriginalURL);
    }
  } catch (error) {
    return res.status(error.StatusCode || 500).json({
      message: error.message,
      success: false,
    });
  }
}

export async function handleAnalysisUrl(req, res) {
  try {
    const url_shortId = req.params?.shortId;
    const result = await URL.findOne({ shortId: `${url_shortId}` });
    if (!result) {
      const err = new Error("URL not found");
      err.StatusCode = 404;
      throw err;
    }
    return res.json({
      Visited: `${result.visitHistory.length}`,
      visitHistory: result.visitHistory,
      success: true,
    });
  } catch (error) {
    return res.status(error.StatusCode || 500).json({
      message: error.message,
      success: false,
    });
  }
}

export async function handleDeleteUrl(req, res) {
  try {
    const url_shortId = req.body.deleteUrl;
    const deleteUrl = await URL.deleteOne({ shortId: `${url_shortId}` });
    if (!deleteUrl) {
      const err = new Error("URL not found");
      err.StatusCode = 404;
      throw err;
    }
    return res
      .status(200)
      .json({ mess: "url got deleted", success: true, URL: deleteUrl });
  } catch (error) {
    return res.status(error.StatusCode || 500).json({
      message: error.message,
      success: false,
    });
  }
}
