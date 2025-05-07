const shortid = require("shortid");
const urlModel = require("../model/url_model");

exports.postGenerateNewShortUrl = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required." });
  }

  try {
    const shortId = shortid();

    await urlModel.create({
      shortId: shortId,
      redirectUrl: url,
      visitHistory: [],
    });

    return res.status(201).json({ id: shortId });
  } catch (err) {
    console.error("Error generating short URL:", err);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

exports.getGenerateNewShortUrl = async (req, res) => {
  const shortId = req.params.shortId;

  if (!shortId) {
    return res.status(400).json({ error: "shortId is required." });
  }

  try {
    const entry = await urlModel.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: { visitHistory: { timestamp: Date.now() } },
      }
    );
    // console.log("find and  update entry:", entry);

    return res.redirect(entry.redirectUrl);
  } catch (err) {
    console.error("Error get to website through shortId:", err);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

exports.getAnalyticsUrl = async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await urlModel.findOne({ shortId });
  // console.log("data entry:", entry);
  const totalClicks = entry.visitHistory.length;
  const analytics = entry.visitHistory;
  return res.json({
    totalClicks: totalClicks,
    analytics: analytics,
  });
};

exports.deleteEntryUrl = async (req, res) => {
  const shortId = req.params.shortId;

  const deleteEntry = await urlModel.findOneAndDelete({ shortId });

  return res.json({
    msg: "delete successfully !",
    deleteEntry,
  });
};
