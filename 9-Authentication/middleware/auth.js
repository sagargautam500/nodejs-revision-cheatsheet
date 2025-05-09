const { getUser } = require("../service/auth");

function restrictToLoginUserOnly(req, res, next) {
  const token = req.cookies.uid;
  if (!token) return res.redirect("/api/user/login");
  const user = getUser(token);
  if (!user) return res.redirect("/api/user/login");
  req.user = user;
  next();
}

// function restrictToLoginUserOnly(req, res, next) {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }
//   const token = authHeader.split(" ")[1];
//   const user = getUser(token); // jwt.verify
//   if (!user) {
//     return res.status(401).json({ error: "Invalid or expired token" });
//   }
//   req.user = user;
//   next();
// }

module.exports = restrictToLoginUserOnly;
