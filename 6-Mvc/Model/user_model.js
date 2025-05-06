const { default: mongoose } = require("mongoose");

const userSchema=mongoose.Schema({
  first_name:{type:String,required:true},
  last_name:String,
  email:{type:String,required:true,unique:true},
  gender:{type:String,required:true},
  job_title:String
},{timestamps:true});

module.exports=mongoose.model('User',userSchema);
 