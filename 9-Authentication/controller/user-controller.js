const { v4: uuidv4 } = require("uuid");
const User = require("../model/user_model");
const { setUser } = require("../service/auth");

exports.getSignUp = (req, res) => {
  // console.log("original Url:", req.originalUrl);
  // console.log("Host:", req.headers.host);
  res.render("auth/signup");
};

exports.postSignUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const terms = req.body.terms === "on"; // Convert to boolean

    const user = new User({
      name,
      email,
      password,
      role,
      terms,
    }); 

    await user.save();
    res.redirect("/api/user/login");
  } catch (err) {
    console.error(err);
    res.status(500).send("Registration failed.");
  }
};

exports.getLogin = (req, res) => {
  // console.log("original Url:", req.originalUrl);
  // console.log("Host:", req.headers.host);
  res.render("auth/login", { error: "" });
};
exports.postLogin = async (req, res) => {
  // console.log("body:", req.body);
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  // console.log('user:',user)
  if (!user) {
    return res.render("auth/login", { error: "Invalid Email or Password" });
  } else {
    const token = setUser(user); //jwt.sign(user,'Sagar@123$$');
    res.cookie("token", token);
    // res.json({token})
    return res.redirect("/");
  }
};

exports.postLogout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/api/user/login");
};
