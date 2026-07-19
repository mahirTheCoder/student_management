const express = require("express");
const router = express.Router();

const { resetPassword } = require("../../controllers/authcontroller");

router.post ("/resetPassword/:token", resetPassword);

module.exports = router;