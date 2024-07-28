var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shivnirvaat@gmail.com",
    pass: "jenulfwthjzsakmg",
  },
});

exports.sendForgotPasswordMail = async (email, otp) => {
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

exports.sendVerificationMail = async (email, otp) => {
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

