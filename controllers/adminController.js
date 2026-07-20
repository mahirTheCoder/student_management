const userSchema = require("../models/userSchema");

const allUserCheck = async (req, res, next) => {
  try {
    const allUsers = await userSchema.find({ role: ["student", "teacher"] });

    if (!allUsers) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    console.log("All Users:", allUsers);

    // -------single data fetch
    // const tecUser = await userSchema.find({ role: 'teacher' });
    // console.log("Teacher Users:", tecUser);

    // const studentUser = await userSchema.find({ role: 'student' });
    // console.log("Student Users:", studentUser);

    res.status(200).json({ message: "Admin check successful" });
  } catch (error) {
    console.error("Error in admin check:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const approvedUserCheck = async (req, res, next) => {
    const params = req.params.id;
  try {
    const approvedUsers = await userSchema.findByIdAndUpdate(params, { isApproved: true }, { new: true });
    res.status(200).json({ message: "Approved users check successful", users: approvedUsers });
  } catch (error) {
    console.error("Error in approved users check:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { allUserCheck, approvedUserCheck };
 