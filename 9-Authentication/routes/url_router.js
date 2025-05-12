const express = require("express");
const {
  deleteEntryUrl,
  getSingleShortUrl,
  getGenerateNewUrl,
  postNewShortUrl,
  getHomePage,
  getAllAnalyticsUrl,
  getSingleAnalyticsUrl, 
} = require("../controller/url_controller");

const urlRouter = express.Router();
const staticRouter = express.Router();

staticRouter.get("/", getHomePage);

urlRouter.get("/", getGenerateNewUrl);
urlRouter.post("/", postNewShortUrl);
urlRouter.get("/analytics", getAllAnalyticsUrl);
// urlRouter.get("/analytics/:shortId", getSingleAnalyticsUrl);
urlRouter.post("/analytics/:shortId", getSingleAnalyticsUrl);
// urlRouter.delete("/delete/:shortId", deleteEntryUrl);
urlRouter.post("/delete/:shortId", deleteEntryUrl);
urlRouter.get("/:shortId", getSingleShortUrl);

module.exports = { urlRouter, staticRouter };
