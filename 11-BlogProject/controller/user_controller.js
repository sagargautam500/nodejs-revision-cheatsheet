const User = require("../model/user-model");

exports.getSignup = (req, res) => {
  res.render("signup");
};
exports.postSignup = async (req, res) => {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });
  res.redirect("/user/signin");
};
exports.getSignin = (req, res) => {
  res.render("signup");
};
exports.postSignin = (req, res) => {
  const { email, password } = req.body;
  res.json({ email, password });
};
