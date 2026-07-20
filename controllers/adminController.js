
const userSchema = require("../models/userSchema");


const adminCheck = async  (req, res, next) => {

  const allUsers = await userSchema.find({ role: [ 'student', 'teacher' ] });

  if (!allUsers) {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  console.log("All Users:", allUsers);

res.status(200).json({ message: "Admin check successful" });
};


module.exports = { adminCheck };