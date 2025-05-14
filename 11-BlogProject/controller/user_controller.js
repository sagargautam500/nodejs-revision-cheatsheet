const User = require("../model/user-model");
const { createTokenForUser } = require("../services/authentication");

// Render Signup Page
exports.getSignup = (req, res) => {
  // console.log(req.cookies.token)
  // console.log(req.user);
  res.render("signup", { error: "", user: "" });
};

// Handle Signup Form Submission
exports.postSignup = async (req, res) => {
  const { fullName, email, password, confirmPassword, role } = req.body;

  // Check password confirmation
  if (password !== confirmPassword) {
    return res.status(400).render("signup", {
      error: "Passwords do not match",
      user: req.body,
    });
  }

  try {
    // Attempt to create user
    await User.create({
      fullName,
      email: email.trim().toLowerCase(),
      password,
      role,
    });

    // Redirect to signin page after success
    res.redirect("/user/signin");
  } catch (err) {
    let errorMsg = "Something went wrong";

    // Duplicate email error (MongoDB error code 11000)
    if (err.code === 11000) {
      errorMsg = "Email already exists";
    }

    // Render signup page with error
    res.status(400).render("signup", {
      error: errorMsg,
      user: req.body,
    });
  }
};

// Render Signin Page
exports.getSignin = (req, res) => {
  res.render("signin", { error: "", email: "" });
};

// Handle Signin Form Submission
exports.postSignin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.trim().toLowerCase() });

    if (!user) {
      return res.status(400).render("signin", {
        error: "Invalid email or password",
        email,
      });
    }

    const isMatch = await user.validatePassword(password);

    if (!isMatch) {
      return res.status(400).render("signin", {
        error: "Invalid email or password",
        email,
      });
    }

    // At this point, user is authenticated
    // You can use session, JWT, or any login logic here
    const token = createTokenForUser(user);
    res.cookie("token", token); //token save as a cookie
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).render("signin", {
      error: "Internal Server Error",
      email,
    });
  }
};

exports.getLogout = (req, res) => {
  // Clear the cookie named 'token'
  res.clearCookie('token');

  // Optionally, redirect to login or home page
  res.redirect('/user/signin');
};
