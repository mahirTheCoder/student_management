const express = require("express");
const router = express.Router();

const loginRoute = require("./loginroute");

router.use("/auth", loginRoute);

module.exports = router;