const express = require("express");
const router = express.Router();
let {
  
  landingpageController,
  registerpageController,
  registerController,
  logoutController,
  loginController,
  profileController,
} = require("../controller/indexcontroller");

let{isLoggedin,redirectIfLoggedin}=require("../middlewares/auth-middlewares")

router.get("/",redirectIfLoggedin, landingpageController);

router.get("/register",redirectIfLoggedin,registerpageController)

router.post("/register", registerController);

router.get("/logout", logoutController);

router.post("/login",loginController);

router.get("/profile",isLoggedin,profileController)

module.exports = router;
