const Blog = require("../model/blog_model");
const Comment = require("../model/comment_model");

exports.getHomePage = async (req, res) => {
  // console.log(req.method,req.url,req.headers.host)
  // console.log('home page user:',req.user)
  const blogs = await Blog.find({})
    .populate("createdBy")
    .sort({ createdAt: -1 });
  // console.log(blogs);

  // const comments = await Comment.find({})
  //   .populate("blogId")
  //   .populate("createdBy");

  const totalComments = await Comment.find({}).populate("blogId", "_id");
  const blogId=totalComments.blogId._id;
  console.log(blogId)

  res.render("home", { blogs ,comments:''});
};
