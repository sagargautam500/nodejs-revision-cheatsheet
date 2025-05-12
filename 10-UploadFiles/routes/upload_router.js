const express=require('express');
const { getHome, getUploadFiles, postUploadFiles } = require('../controller/upload_controller');

const uploadRouter=express.Router();

uploadRouter.get('/',getHome);
uploadRouter.get('/upload',getUploadFiles);
uploadRouter.post('/upload',postUploadFiles);

module.exports=uploadRouter;