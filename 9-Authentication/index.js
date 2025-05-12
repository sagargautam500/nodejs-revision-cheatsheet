const express = require("express");
const path = require("path");
const cookieParser=require('cookie-parser');
const connectToMongoDb = require("./connect");
const {urlRouter, staticRouter} = require("./routes/url_router");
const userRouter = require("./routes/user-router");
const {checkForAuthentication, setUserIfExists} = require("./middleware/auth");
const app = express();
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());
app.use(cookieParser())
//..................................................for ejs middleware.................
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
//...............................................................................
// Use this globally, before your res.locals.user middleware
app.use(setUserIfExists); 

// Add this after your authentication middleware and before your routes
app.use((req, res, next) => {
  res.locals.user = req.user; // user will be available in all EJS views
  next();
});
app.use(staticRouter)
app.use("/api/url",checkForAuthentication, urlRouter); //handle routing middleware      
app.use("/api/user",userRouter);  
   
connectToMongoDb()   
  .then(() => {
    console.log("database connected...!");
  })
  .catch((err) => {
    console.log("error occur while connect to database:", err);
  });

const PORT = 3001;
app.listen(PORT, () => { 
  console.log(`Server running at http://localhost:${PORT}`);
});
module.exports=PORT;  