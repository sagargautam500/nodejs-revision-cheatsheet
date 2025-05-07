const { default: mongoose } = require("mongoose");

const urlSchema = mongoose.Schema(
  {
    shortId: { type: String, required: true, unique: true },
    redirectUrl: { type: String, required: true },
    visitHistory: [{ timestamp: { type: Number } }],
  },
  { timestamps: true }
);

const urlModel = mongoose.model("Url", urlSchema);

module.exports = urlModel;
