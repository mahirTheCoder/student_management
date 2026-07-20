const express = require("express");
const router = express.Router();
const { allUserCheck , approvedUserCheck , deleteUserCheck} = require("../../controllers/adminController");



router.get("/allUserCheck", allUserCheck);
router.patch("/approvedUserCheck/:id", approvedUserCheck);
router.patch("/approvedUserCheck/:id", approvedUserCheck);
router.delete("/deleteUserCheck/:id", deleteUserCheck);

module.exports = router;