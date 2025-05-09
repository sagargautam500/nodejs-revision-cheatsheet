const jwt = require("jsonwebtoken");

const secret = "Sagar@123$$"; // You should store this in environment variables in production

function setUser(user) {
  const payload = { id: user._id, email: user.email };
  return jwt.sign(payload, secret, { expiresIn: "1h" });  
}

function getUser(token) {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null; // or handle the error as needed
  }
}

module.exports = { setUser, getUser };
