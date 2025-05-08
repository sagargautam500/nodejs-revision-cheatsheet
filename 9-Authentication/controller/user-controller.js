const User = require("../model/user_model");

exports.getSignUp = (req, res) => {
  // console.log("original Url:", req.originalUrl);
  // console.log("Host:", req.headers.host);
  res.render("auth/signup");
};

exports.postSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const terms = req.body.terms === "on"; // Convert to boolean

    const user = new User({
      name,
      email,
      password,
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
  res.render("auth/login");
};
exports.postLogin = async (req, res) => {
  console.log("body:", req.body);
  res.json({ login_body: req.body });
};
