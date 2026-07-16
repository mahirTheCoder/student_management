const express = require("express");
const router = express.Router();
// const { signup } = require ('../../controller/authController/SignUpController')

router.post("/signup", (req, res) => {
    res.send("SignUp Route connected successfully");
});


module.exports = router;