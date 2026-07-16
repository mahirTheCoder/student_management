const express = require("express");
const router = express.Router();

const { resendOtp } = require("../../controllers/authcontroller");

router.post ("/resendOtp", resendOtp);

module.exports = router;