const express = require("express");
const router = express.Router();
const { allUserCheck , approvedUserCheck} = require("../../controllers/adminController");



router.get("/allUserCheck", allUserCheck);
router.patch("/approvedUserCheck/:id", approvedUserCheck);



module.exports = router;