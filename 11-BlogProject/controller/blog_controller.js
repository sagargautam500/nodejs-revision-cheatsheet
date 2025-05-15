const Blog = require("../model/blog_model");
const Comment = require("../model/comment_model");

exports.getAddBlog = (req, res) => {
  res.render("add_blog", { error: "", blog: "" });
};

exports.getBlogs = async (req, res) => {
  const userId = req.user._id;
  const blogs = await Blog.find({ createdBy: userId }).sort({ createdAt: -1 });
  // console.log(blogs);
  res.render("blogs", { blogs });
};

exports.getSingleBlog = async (req, res) => {
  const blogId = req.params.id;
  const blog = await Blog.findById(blogId).populate("createdBy");
  res.render("blog", { blog });
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
    const blogImageUrl = `/uploads/${req.file.filename}`; //But the browser needs a public path, e.g. /uploads/filename.jpg, not a full OS path.

    await Blog.create({
      title,
      category,
      content,
      blogImageUrl,
      createdBy: req.user._id,
    });

    res.redirect("/blogs");
  } catch (err) {
    console.error("Blog creation error:", err);
    res.render("add_blog", {
      error: "An error occurred while creating the blog.",
      blog: req.body,
    });
  }
};

exports.postComment = async (req, res) => {
  const content = req.body.content;
  const blogId = req.params.Id;
  const user = req.user;
  if (!user) {
    return res.render("signin", {
      error: "⚠️ Please sign in to comment on a post.",
      email: "",
    });
  }
  await Comment.create({
    content,
    blogId,
    createdBy: user._id,
  });
  res.redirect(`/blogs/${blogId}`);
};
