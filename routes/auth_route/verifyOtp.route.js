const express = require("express");
const router = express.Router();

const { verifyOtp } = require("../../controllers/authcontroller");

router.post ("/verifyOtp", verifyOtp);

module.exports = router;