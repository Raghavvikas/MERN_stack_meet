const express = require("express");
const { verify } = require("jsonwebtoken");

const {
  authUser,
  registerUser,
  updateUserProfile,
  forgotPassword,
  changePassword,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// const nodeCustomRecaptcha = require("node-custom-recaptcha");

// router.route("/").get(function (req, res) {
//   nodeCustomRecaptcha.getRecaptcha(function (img, captchaValue) {
//     console.log("getRecaptcha response....");
//     console.log("captchaValue : ", captchaValue);
//     console.log("img : ", img);

//     //Store captchaValue value in session or cookie or database for verify this ReCaptcha at verification time

//     res.json({ captchaImgSrc: img });
//   });
// });

router.route("/signup").post(registerUser);
router.post("/login", authUser);
router.route("/profile").post(protect, updateUserProfile);
router.route("/forget-password").post(forgotPassword);
router.route("/reset-password").put(changePassword);

module.exports = router;
