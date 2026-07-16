const nodemailer = require("nodemailer");
const { emailTemp } = require("./emailTemp");

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: "mahirthecoder.bd@gmail.com",
    pass: "acgg rmko tyze jshm",
  },
});

const mailSender = async ({ email, subject, otp }) => {
  try {
    await transporter.sendMail({
      from: '" Damo project Team" <team@example.com>',
      to: email,
      subject,
      html: emailTemp({otp})
    });
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
};

module.exports = {mailSender}