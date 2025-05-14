const Blog = require("../model/blog_model");

exports.getHomePage=async(req,res)=>{
  // console.log(req.method,req.url,req.headers.host)
  // console.log('home page user:',req.user)
  const blogs=await Blog.find({}).sort({ createdAt: -1 });
  // console.log(blogs);
  res.render("home",{blogs});
}