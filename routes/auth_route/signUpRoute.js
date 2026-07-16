const express = require("express");
const router = express.Router();
const { signup } = require("../../controllers/authcontroller");
// const { signup } = require ('../../controller/authController/SignUpController')

router.post("/signup",  signup )

module.exports = router;