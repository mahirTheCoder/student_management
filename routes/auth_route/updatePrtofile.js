const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();


const {authMiddleware} = require("../../middleware/authMiddleware");

const { updateProfile } = require("../../controllers/authcontroller");

router.put("/updateProfile", authMiddleware, upload.single("avatar"), updateProfile);

module.exports = router;