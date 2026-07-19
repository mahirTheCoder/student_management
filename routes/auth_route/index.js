const express = require("express");
const router = express.Router();

const Signin = require("./signInRoute");
const Signup = require ('./signUpRoute')
const VerifyOtp = require("./verifyOtp.route");
const resendOtp = require("./resendOtpRoute");
const getProfile = require("./getProfileRoute");
const updateProfile = require("./updatePrtofile");
const forgotPassword = require("./forgetPassroute");
const resetPassword = require("./resetPasswordRoute");


router.use("/auth", Signup );
router.use("/auth", Signin);
router.use("/auth", VerifyOtp);
router.use("/auth", resendOtp);
router.use("/auth", getProfile);
router.use("/auth", updateProfile);
router.use("/auth", forgotPassword);
router.use("/auth", resetPassword);

module.exports = router;