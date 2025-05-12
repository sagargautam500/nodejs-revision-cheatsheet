const { getUser } = require("../service/auth");

async function checkForAuthentication(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.redirect("/api/user/login");
    }
    const user = await getUser(token);
    if (!user) {
      return res.redirect("/api/user/login");
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("please login first");
    res.redirect("/api/user/login");
  }
}


async function setUserIfExists(req, res, next) {
  const token = req.cookies?.token;
  if (token) {
    const user = await getUser(token);
    if (user) {
      req.user = user;
    }
  }
  next();
}


// function restrictTo(roles = []) {
//   return function (req, res, next) {
//     if (!req.user) return res.redirect("/api/user/login");
//     if (!roles.includes(req.user.role)) {
//       return res.end("unAuthorized");
//     }
//     return next();
//   };
// }

module.exports = { checkForAuthentication, setUserIfExists};

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
// module.exports = restrictToLoginUserOnly;
