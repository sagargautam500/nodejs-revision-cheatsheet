const express = require("express");

const app = express();

// http://localhost:3002/about/34
app.get('/about/:id',(req,res,next)=>{
  console.log(req.method, req.body, req.url, req.params, req.query);
  res.send(`This Is about Page paramId:${req.params.id}`)
})

// http://localhost:3002/contact?name=Sagar
app.get('/contact',(req,res,next)=>{
  console.log(req.method, req.body, req.url, req.params, req.query);
  res.send(`This Is about Page Name:${req.query.name}`)
})

app.use("/", (req, res) => {
  console.log(req.method, req.body, req.url, req.params, req.query);
  res.send("This is Home page");
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server Started at http://localhost:${PORT}`);
});
