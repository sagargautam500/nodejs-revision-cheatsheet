const express = require("express");
const { postGenerateNewShortUrl, getGenerateNewShortUrl, getAnalyticsUrl, deleteEntryUrl } = require("../controller/url_controller");
const urlRouter = express.Router();

urlRouter.post("/", postGenerateNewShortUrl);
urlRouter.get("/:shortId", getGenerateNewShortUrl);
urlRouter.get("/analytics/:shortId", getAnalyticsUrl);
urlRouter.delete("/:shortId", deleteEntryUrl);

module.exports = urlRouter;
