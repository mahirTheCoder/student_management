const express = require("express");
const router = express.Router();

const Signin = require("./signInRoute");
const Signup = require ('./signUpRoute')

router.use("/auth", Signup );
// router.use("/auth", Signin);

module.exports = router;