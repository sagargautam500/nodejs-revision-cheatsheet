const express=require('express');
const { getAddBlog, postAddBlog } = require('../controller/blog_controller');

const blogRouter=express.Router();

blogRouter.get('/addblogs',getAddBlog);
blogRouter.post('/addblogs',postAddBlog);

module.exports=blogRouter;