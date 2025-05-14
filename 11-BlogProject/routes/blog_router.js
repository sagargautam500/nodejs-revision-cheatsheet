const path = require("path");
const express = require("express");
const { getAddBlog, postAddBlog, getBlog } = require("../controller/blog_controller");
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
blogRouter.get("/blogs/:id", getBlog);
blogRouter.post("/addblogs", upload.single("blogImage"), postAddBlog);

module.exports = blogRouter;