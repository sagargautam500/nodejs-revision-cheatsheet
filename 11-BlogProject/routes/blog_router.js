const path = require("path");
const express = require("express");
const { getAddBlog, postAddBlog, getBlogs, getSingleBlog, postComment } = require("../controller/blog_controller");
const multer = require("multer");

const blogRouter = express.Router();

const uploadPath = path.resolve(__dirname, "../public/uploads");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log(file);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
}); 
const upload = multer({ storage: storage });

blogRouter.get("/addblogs", getAddBlog);
blogRouter.get("/blogs", getBlogs);
blogRouter.get("/blogs/:id", getSingleBlog);
blogRouter.post("/addblogs", upload.single("blogImage"), postAddBlog);
blogRouter.post("/comment/:Id",postComment);

module.exports = blogRouter;