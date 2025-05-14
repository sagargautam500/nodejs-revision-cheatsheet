const Blog = require("../model/blog_model");

exports.getAddBlog = (req, res) => {
  res.render("add_blog", { error: "", blog: "" });
};
exports.getBlog = (req, res) => {
  
  res.render("blog", {blog});
};

exports.postAddBlog = async (req, res) => {
  try {
    const { title, category, content } = req.body;

    // Check required fields
    if (!title || !content || !req.file) {
      return res.render("add_blog", {
        error: "Title, content, and image are required.",
        blog: { title, category, content },
      });
    }
   
    // const blogImageUrl = req.file.path.replace(/\\/g, "/"); // Normalize Windows path
    const blogImageUrl=`/uploads/${req.file.filename}` //But the browser needs a public path, e.g. /uploads/filename.jpg, not a full OS path.

    await Blog.create({
      title,
      category,
      content,
      blogImageUrl,
      createdBy: req.user._id,
    });

    res.redirect(`/blogs/${req.user._id}`);
  } catch (err) {
    console.error("Blog creation error:", err);
    res.render("add_blog", {
      error: "An error occurred while creating the blog.",
      blog: req.body,
    });
  }
};
