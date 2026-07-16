const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  avatar: {
    type: String,
    default: "",
  },

  address: {
    type: String,
  },
  otp: {
    type: String,
    default: "",
  },
  otpExpires: {
    type: Date,
  },
  roll: {
    type: String,
    required: true,
    enum: ["user", "admin", "moderator"],
    default: "user",
  },

  otpverify: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  tyimestamp: {
    type: Date,
    default: Date.now,
  },
});

// -----------prtesave hash password signup-------------
userSchema.pre("save", async function () {
  // password change na hole hash hobe na
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

// ----------- compare password signin -------------

userSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);