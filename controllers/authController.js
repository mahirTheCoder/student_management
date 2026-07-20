const { request } = require("express");
const { mailSender } = require("../helpers/mailService");
const crypto = require("crypto");

const {
  generateOTP,
  isValidEmail,
  generateAccessToken,
  generateRefreshToken,
  uploadCloudinary,
  destroyFromCloudinary,
} = require("../helpers/utils");
const userSchema = require("../models/userSchema");

// -----------signUp Controler
const signup = async (req, res) => {
  const { fullname, email, password, role } = req.body;
  try {
    if (!fullname) return res.status(400).send("Fullname is required");
    if (!email) return res.status(400).send("Email is required");
    if (!isValidEmail(email)) return res.status(400).send("Invalid email");
    if (!password || password.length < 6)
      return res
        .status(400)
        .send("Password is required and must be at least 6 characters long");

    if (!role) return res.status(400).send("Role is required");

    // --------existing user
    const existingUser = await userSchema.findOne({ email });
    if (existingUser)
      return res.status(400).send("User with this email already exists");

    // --------------otp generate
    const otp = generateOTP();

    // ----------data base save
    const user = await userSchema.create({
      fullname,
      email,
      password,
      role,
      otp,
      otpExpires: Date.now() + 5 * 60 * 1000,
    });

    // ---------send otp to user mail
    try {
      await mailSender({
        email,
        subject: "OTP Verification",
        otp,
      });
    } catch (mailError) {
      console.error("Signup OTP Mail Error:", mailError);
      return res
        .status(500)
        .json({
          success: false,
          message: "Failed to send OTP email. Please try again.",
        });
    }

    res.status(200).send("SignUp Successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
};

// ----------veriFy Otp controller
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await userSchema.findOne({
      email,
      otp,
      otpExpires: { $gt: Date.now() },
      isVerified: false,
    });
    if (!user) return res.status(400).send("Invalid OTP or User not found");
    // -------after validations
    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    // ----------data abse save data
    await user.save();

    res.status(200).send("OTP verified successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error ");
  }
};

// --------reSend otp controller
const resendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userSchema.findOne({
      email,
      isVerified: false,
    });

    if (!user) return res.status(400).send("inavlid request");

    // ----------otp generator
    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;

    // ---------send otp to user mail
    await mailSender({
      email,
      subject: "Otp Verifications ",
      otp,
    });

    // ---------save data base stor
    await user.save();

    res.status(200).send("reSendOtp Successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

// ---------cookie configs
const cookieConfig = {
  httpOnly: true, // Prevents client-side JS/XSS attacks
  secure: true, // Ensures cookie is sent only over HTTPS
  maxAge: 1000 * 60 * 60 * 24 * 7, // Expires in 7 days (in milliseconds)
};

// ----------signIn controller
const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userSchema.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).send("Invalid email or password");
    }

    // ------------comapre password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).send("Invalid email or password");
    }

    // ------------access token refresh token pass
    const accTkn = generateAccessToken(user);
    const refTkn = generateRefreshToken(user);

    res
      .status(200)
      .cookie("accTkn", accTkn, cookieConfig)
      .cookie("refTkn", refTkn, cookieConfig)
      .send("signIn Successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

// ----------forgret password controller
// ---------- Forgot Password Controller

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // -------- Validation
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    // -------- Find User
    const user = await userSchema.findOne({ email });

    // Security Response
    const successMessage =
      "If an account exists with that email, a password reset link has been sent.";

    if (!user) {
      return res.status(200).json({
        success: true,
        message: successMessage,
      });
    }

    // -------- Generate Reset Token
    const resetToken = user.createPasswordResetToken();

    console.log("Reset Token:", resetToken);

    // -------- Save Token
    await user.save({ validateBeforeSave: false });

    // -------- Reset Link
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    // -------- Send Mail
    try {
      await mailSender({
        email: user.email,
        subject: "Password Reset Request",
        resetLink,
      });
    } catch (mailError) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save({ validateBeforeSave: false });

      console.error(mailError);

      return res.status(500).json({
        success: false,
        message: "Failed to send reset email",
      });
    }

    return res.status(200).json({
      success: true,
      message: successMessage,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// -----------reset password controller
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    if (!password) {
      return res.status(400).send("Password is required");
    }

    if (password.length < 6) {
      return res
        .status(400)
        .send("Password must be at least 6 characters long");
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await userSchema.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).send("Invalid or expired reset link");
    }

    user.password = password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.status(200).send("Password reset successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  }
};
// -----------profile controllerp
const getProfile = async (req, res) => {
  try {
    const user = await userSchema.findOne(
      { _id: req.user._id },
      { fullname: 1, email: 1, role: 1, avatar: 1, address: 1 },
    );

    if (!user) return res.status(400).send({ message: "Invalid request" });

    res.status(200).send(user);
  } catch (error) {
    console.log("PROFILE ERROR:", error);

    return res.status(500).send({
      message: "Internal Server Error.",
    });
  }
};

// --------------update profile controller
const updateProfile = async (req, res) => {
  const { fullname, address } = req.body;
  const avatar = req.file;

  try {
    const user = await userSchema.findOne({
      _id: req.user._id,
    });

    if (!user) {
      return res.status(400).send({
        message: "Invalid Request",
      });
    }

    if (fullname?.trim()) {
      user.fullname = fullname;
    }

    if (address?.trim()) {
      user.address = address;
    }

    if (avatar) {
      try {
        const avatarUrl = await uploadCloudinary({
          mimetype: avatar.mimetype,
          imgBuffer: avatar.buffer,
        });

        if (user.avatar) destroyFromCloudinary(user.avatar);
        user.avatar = avatarUrl;
      } catch (error) {
        console.log("Cloudinary upload error", error);
        return res.status(500).send({ message: "Failed to upload avatar" });
      }
    }

    await user.save();

    res.status(200).send({
      message: "Profile Updated",
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      message: "Server Error",
    });
  }
};

module.exports = {
  signup,
  verifyOtp,
  resendOtp,
  signin,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile,
};
