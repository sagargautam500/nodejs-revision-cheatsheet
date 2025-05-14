exports.getHomePage=(req,res)=>{
  // console.log(req.method,req.url,req.headers.host)
  // console.log('home page user:',req.user)
  res.render("home");
}