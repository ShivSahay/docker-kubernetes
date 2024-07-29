var nodemailer = require("nodemailer");

// config node mailer
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shivnirvaat@gmail.com",
    pass: "jenulfwthjzsakmg",
  },
});

// Sent forgot password otp through email
const sendForgotPasswordMail = async (email, otp) => {
  let emailTemplate = otp;
  let mailOptions = {
    from: "shivnirvaat@gmail.com",
    to: email,
    subject: "OTP for Forgot Password",
    html: `${emailTemplate}`,
  };
  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

// Sent verification otp through email
const sendVerificationMail = async (email, otp) => {
  let emailTemplate = await otp;
  let mailOptions = {
    from: "shivnirvaat@gmail.com",
    to: email,
    subject: "OTP for Email Verification",
    html: `${emailTemplate}`,
  };
  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = {
  sendForgotPasswordMail,
  sendVerificationMail,
};
