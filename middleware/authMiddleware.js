const jwt = require("jsonwebtoken");

// ---------decode 
const authMiddleware = (req, res, next) => {
  try {
    const { accTkn } = req.cookies;
    const decoded = jwt.verify(accTkn, process.env.JWT_SEC);
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      res.status(401).send({ message: "Unauthorized request" });
    }
  } catch (error) {
    console.log("AUTH ERROR:", error);
  }
};

// --------role check middleware 
// const roleCheck = (roles) => {
//   return (req, res, next) => {
//     if (Array.isArray(roles) && roles.length > 0) {
//       if (roles.includes(req.user.role)) {
//         next();
//       } else {
//         res.status(400).send({ message: "Forbidden" });
//       }
//     } else {
//       res.status(400).send({ message: "Forbidden" });
//     }
//   };
// };


module.exports = { authMiddleware  };