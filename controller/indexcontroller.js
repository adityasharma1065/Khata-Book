const userModel = require("../models/user-model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.landingpageController = function (req, res) {
  const errorMessage = req.flash('error');
  res.render("index", { header: false ,errorMessage});
};

module.exports.registerpageController = (req, res) => {
  const errorMessage = req.flash('error');
  res.render("register",{errorMessage,header: false });
};

module.exports.registerController = async (req, res) => {
  try {
    let { name, username, email, password } = req.body;
    let user = await userModel.findOne({ email });

    if (user) {
      req.flash("error","User already exist")
      return res.redirect("/register")
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        user = await userModel.create({
          name,
          email,
          username,
          password: hash,
        });

        const token = jwt.sign(
          { email: user.email, id: user._id },
          process.env.SECRET_KEY
        );
        res.cookie("token", token);
        res.redirect("/profile");
      });
    });
  } catch (err) {
    // res.send(err.message);
    req.flash("error",err.message)
      return res.redirect("/register")
  }
};

module.exports.logoutController = (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
};

module.exports.loginController = async (req, res) => {
  try {
    let { password, email } = req.body;
    if (!email || !password) {
      // return res.status(400).send("Email and password are required");
      req.flash("error","Email and password are required")
      return res.redirect("/")
    }
    var user = await userModel.findOne({
      email,
    });
    if (!user) {
      // return res.send("user don't exist");
      req.flash("error","User don't exist")
      return res.redirect("/")
    }

    // console.log("Password from DB:", user.password);
    // console.log("Password provided:", password);

    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      // return res.status(401).send("Invalid credentials");
      req.flash("error","Invalid credentials")
      return res.redirect("/")
    }
    var token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.SECRET_KEY
    );
    res.cookie("token", token);
    res.redirect("/profile");
  } catch (err) {
    res.send(err.message);
  }
};

module.exports.profileController = async (req, res) => {
  //  res.send(req.user)
  var user=await userModel.findOne({
    email:req.user.email
  }).populate("hisaabID")
  res.render("profile", { user });
};
