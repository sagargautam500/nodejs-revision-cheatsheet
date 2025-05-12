const express=require('express');
const { getHomePage } = require('../controller/home_controller');

const homeRouter=express.Router();

homeRouter.get('/',getHomePage);

module.exports=homeRouter;