const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const cloudinary = require ('../configs/cloudinary')
// --------email regex
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// --------- Generate a random 4-digit OTP
const generateOTP = () => {
  return crypto.randomInt(1000, 10000).toString();
};

//-------Access Token Generate
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SEC,
    { expiresIn: "2h" },
  );
};

// ---------refresh token generate
const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SEC,
    { expiresIn: "15d" },
  );
};


// -----------upload cloudinary
const uploadCloudinary = async ({mimetype, imgBuffer}) => {
  const dataUrl = `data:${mimetype};base64,${imgBuffer.toString("base64")}`;

  const res = await cloudinary.uploader.upload(dataUrl);

  return res.secure_url;
};

// -----------destroy from cloudinary
const destroyFromCloudinary = (url) => {
  const publicId = url.split("/").pop().split(".").shift();

  cloudinary.uploader.destroy(publicId, (error, result) => {
    if (error) {
      console.log("Destroy From Cloudinary:", error);
    }
  });
};


module.exports = {
  isValidEmail,
  generateOTP,
  generateAccessToken,
  generateRefreshToken,
  uploadCloudinary,
  destroyFromCloudinary,
};