var jwt = require("jsonwebtoken");
var userModel = require("../models/user-model");
var hisaabModel = require("../models/hisaab-model");

module.exports.isLoggedin = async (req, res, next) => {
  try {
    if (req.cookies.token) {
      var decoded = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
      var user = await userModel
        .findOne({ email: decoded.email })
        .select("-password");

      req.user = user;

      next();
    } else {
      res.send("you need to login");
    }
  } catch (err) {
    res.send(err.message);
  }
};

module.exports.redirectIfLoggedin = (req, res, next) => {
  if (req.cookies.token) {
    try {
      var decoded = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
      const redirectTo = req.get("Referer") || "/profile";
      res.redirect(redirectTo);
    } catch {
      next();
    }
  } else {
    next();
  }
};
