const express = require("express");
const router = express.Router();

const Signin = require("./signInRoute");
const Signup = require ('./signUpRoute')
const VerifyOtp = require("./verifyOtp.route");
const resendOtp = require("./resendOtpRoute");
const getProfile = require("./getProfileRoute");


router.use("/auth", Signup );
router.use("/auth", Signin);
router.use("/auth", VerifyOtp);
router.use("/auth", resendOtp);
router.use("/auth", getProfile);


module.exports = router;