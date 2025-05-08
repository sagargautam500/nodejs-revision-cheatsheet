const shortid = require("shortid");
const urlModel = require("../model/url_model");

// Home page
exports.getHomePage = (req, res) => {
  res.render("home");
};
// Generate new Url
exports.getGenerateNewUrl = (req, res) => {
  res.render("generateUrl");
};

// Generate and store a new short URL
exports.postNewShortUrl = async (req, res) => {
  const { url } = req.body;
  // console.log(url);

  if (!url) {
    return res.status(400).json({ error: "URL is required." });
  }

  try {
    const shortId = shortid();

    await urlModel.create({
      shortId,
      redirectUrl: url,
      visitHistory: [],
    });

    return res.status(201).redirect("/api/url/analytics");
  } catch (err) {
    console.error("Error generating short URL:", err);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

// Redirect to the original URL using shortId
exports.getSingleShortUrl = async (req, res) => {
  const { shortId } = req.params;

  if (!shortId) {
    return res.status(400).json({ error: "shortId is required." });
  }

  try {
    const entry = await urlModel.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } },
      { new: true }
    );

    if (!entry) {
      return res.status(404).send("Short URL not found.");
    }

    return res.redirect(entry.redirectUrl);
  } catch (err) {
    console.error("Error redirecting using shortId:", err);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

// Render analytics view with all entries
exports.getAllAnalyticsUrl = async (req, res) => {
  // const originalUrl=req.originalUrl
  const host = req.host;
  // console.log('originalUrl:',originalUrl);
  // console.log('host:',host);
  // console.log('Host:',req.headers.host)
  const allUrls = await urlModel.find({});
  res.render("allDetails", { urls: allUrls, host: host });
};

// Return click analytics for a single short URL
exports.getSingleAnalyticsUrl = async (req, res) => {
  const { shortId } = req.params;

  const entry = await urlModel.findOne({ shortId });

  if (!entry) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  return res.render("viewDetail", {
    totalClicks: entry.visitHistory.length,
    analytics: entry.visitHistory,
  });
};

exports.deleteEntryUrl = async (req, res) => {
  const { shortId } = req.params;
  // console.log("Deleting shortId:", shortId);
  const deletedEntry = await urlModel.findOneAndDelete({ shortId });
  if (!deletedEntry) {
    // Optionally render an error page or redirect with a flash message
    return res.status(404).send("Short URL not found");
  }
  // Redirect to the details page after deletion
  return res.redirect("/api/url/analytics");
};
