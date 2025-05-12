const jwt = require("jsonwebtoken");
const User = require("../model/user_model");

const secret = "Sagar@123$$"; // You should store this in environment variables in production

function setUser(user) {
  const payload = { id: user._id, email: user.email };
  return jwt.sign(payload, secret, { expiresIn: "1h" });
}

async function getUser(token) {
  try {
    const payload = jwt.verify(token, secret);
    if (!payload) return null;
    
    const user = await User.findById(payload.id);
    return user;
  } catch (err) {
    return null;
  }
}

module.exports = { setUser, getUser };
