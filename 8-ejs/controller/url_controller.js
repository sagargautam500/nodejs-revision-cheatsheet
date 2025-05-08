const shortid = require("shortid");
const urlModel = require("../model/url_model");

// Get all URLs and render home view
exports.getAllUrl =  (req, res) => {
  res.render("home");
};

// Generate and store a new short URL
exports.postGenerateNewShortUrl = async (req, res) => {
  const { url } = req.body;
  console.log(url);

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

    return res.status(201).redirect('/api/url/analytics');
  } catch (err) {
    console.error("Error generating short URL:", err);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

// Redirect to the original URL using shortId
exports.getGenerateNewShortUrl = async (req, res) => {
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
exports.getAllAnalyticsUrl= async (req, res) => {
  const allUrls = await urlModel.find({});
  res.render("allDetails", { urls: allUrls });
};

// Return click analytics for a single short URL
exports.getAnalyticsUrl = async (req, res) => {
  const { shortId } = req.params;

  const entry = await urlModel.findOne({ shortId });

  if (!entry) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  return res.json({
    totalClicks: entry.visitHistory.length,
    analytics: entry.visitHistory,
  });
};

// Delete a short URL entry
exports.deleteEntryUrl = async (req, res) => {
  const { shortId } = req.params;

  const deletedEntry = await urlModel.findOneAndDelete({ shortId });

  if (!deletedEntry) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  return res.json({
    msg: "Deleted successfully!",
    deletedEntry,
  });
};
