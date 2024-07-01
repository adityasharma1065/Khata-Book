const express = require("express");
const router = express.Router();

let {
  isLoggedin,
  redirectIfLoggedin,
} = require("../middlewares/auth-middlewares");

let {
  createhisaabController,
  createpageController,
  viewhisabController,
  hisaabverifyController,
  deletehisaabController,
  editController,
  saveeditedController
} = require("../controller/hisaabcontroller");

router.post("/create", isLoggedin, createhisaabController);
router.get("/create", isLoggedin, createpageController);
router.get("/view/:id", isLoggedin, viewhisabController);
router.post("/:id/verify", isLoggedin, hisaabverifyController);
router.get("/delete/:id", deletehisaabController);
router.get("/edit/:id", editController);
router.post("/edit/:id", saveeditedController);
module.exports = router;
