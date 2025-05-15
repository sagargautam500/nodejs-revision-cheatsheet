const { default: mongoose } = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    blogImageUrl: String,
    title: { type: String, required: true },
    category: { type: String, required: false },
    content: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true } 
);

const Blog = mongoose.model("Blog", blogSchema); // singular model name is good
module.exports = Blog;

