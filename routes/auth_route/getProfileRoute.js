const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();


const {authMiddleware} = require("../../middleware/authMiddleware");

const { getProfile } = require("../../controllers/authcontroller");

router.get("/getProfile", authMiddleware, getProfile);

module.exports = router;