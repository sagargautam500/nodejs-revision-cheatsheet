const express = require("express");
const {
  postGenerateNewShortUrl,
  getGenerateNewShortUrl,
  getAnalyticsUrl,
  deleteEntryUrl,
  getAllUrl,
  getAllAnalyticsUrl 
} = require("../controller/url_controller");

const urlRouter = express.Router();

urlRouter.get("/", getAllUrl);
urlRouter.post("/", postGenerateNewShortUrl);
urlRouter.get("/analytics", getAllAnalyticsUrl);
urlRouter.get("/analytics/:shortId", getAnalyticsUrl);
urlRouter.delete("/:shortId", deleteEntryUrl);
urlRouter.get("/:shortId", getGenerateNewShortUrl);

module.exports = urlRouter;
