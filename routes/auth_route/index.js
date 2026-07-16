const express = require("express");
const router = express.Router();

const Signin = require("./signInRoute");
const Signup = require ('./signUpRoute')
const VerifyOtp = require("./verifyOtp.route");
const resendOtp = require("./resendOtpRoute");


router.use("/auth", Signup );
router.use("/auth", Signin);
router.use("/auth", VerifyOtp);
router.use("/auth", resendOtp);


module.exports = router;