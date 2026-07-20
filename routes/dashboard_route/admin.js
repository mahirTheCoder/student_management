const express = require("express");
const router = express.Router();
const { allUserCheck } = require("../../controllers/adminController");



router.get("/allUserCheck", allUserCheck);



module.exports = router;