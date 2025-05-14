const { validateToken } = require("../services/authentication");

function checkAuthentication() {
  return (req, res, next) => {
    const token = req.cookies.token;
    try {
      const user = validateToken(token);
      req.user = user;
    } catch (error) {}
    next();
  };
}

module.exports = checkAuthentication;
