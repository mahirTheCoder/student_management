const nodemailer = require("nodemailer");
const { emailTemp } = require("./emailTemp");

// Create Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mahirthecoder.bd@gmail.com",
    pass: "acgg rmko tyze jshm",
  },
});

// Send Mail
const mailSender = async ({ email, subject, otp, resetLink }) => {
  try {
    await transporter.sendMail({
      from: '"Management Project Team" <team@example.com>',
      to: email,
      subject,
      html: emailTemp({
        otp,
        resetLink,
      }),
    });

    console.log("Email sent successfully");
  } catch (err) {
    console.error("Error while sending mail:", err);
    throw err;
  }
};

module.exports = {
  mailSender,
};
