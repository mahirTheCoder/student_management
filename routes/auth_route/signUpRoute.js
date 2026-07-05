const express = require("express");
const router = express.Router();
const { signup } = require ('../../controller/authController/SignUpController')

router.post("/signup", signup )


module.exports = router;