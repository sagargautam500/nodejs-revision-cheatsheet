exports.getAddBlog = (req, res) => {
  res.render("add_blog",{error:'',blog:''});
};
exports.postAddBlog = (req, res) => {
  console.log("blog:", req.body);
  res.end("blog post successfully");
};
