const jwt = require("jsonwebtoken");

const secret = "$sagarGtm$$$@389";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    profileImageUrl: user.profileImageUrl
  };
  return jwt.sign(payload, secret);
}

function validateToken(token) {
  const payload = jwt.verify(token, secret);
  return payload;
}

module.exports = { createTokenForUser, validateToken };
