const User = require("../Modals/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { generate } = require("otp-generator");
const jwt = require("../utils/jwtAuth");
const { sendResponse, sendMessageResponse } = require("../utils/common");
const {
  sendVerificationMail,
  sendForgotPasswordMail,
} = require("../utils/nodemailer");

const generateOtp = async () => {
  let otp = generate(6, {
    upperCaseAlphabets: true,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  return otp;
};

const userSignUp = async (req, res) => {
  let otp = await generateOtp();

  let { firstName, lastName, email, password, phoneNumber, about } = req.body;
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  let userExists = await User.findOne({ email: email });
  let user;
  // Check the user is exist or not
  if (userExists && userExists.isVerified === true) {
    return sendMessageResponse(res, {
      message: "Email Already Exists",
      code: 403,
      status: false,
    });
  } else if (userExists && userExists.isVerified === false) {
    user = await User.findOneAndUpdate(
      { email: email },
      {
        $set: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: encryptedPassword,
          phoneNumber: phoneNumber,
          about: about,
          issuedAt: Math.round(Date.now() / 1000),
          expiringAt: Math.round(Date.now() / 1000) + 300,
          otp: otp,
        },
      },
      { new: true }
    );
  } else {
    user = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: encryptedPassword,
      phoneNumber: phoneNumber,
      about: about,
      issuedAt: Math.round(Date.now() / 1000),
      expiringAt: Math.round(Date.now() / 1000) + 300,
      otp: otp,
    });
  }

  // Send verification mail
  await sendVerificationMail(email, otp);

  return sendResponse(res, {
    data: user,
    message: "User Registered and Otp is sent on Email",
  });
};

const verifyUser = async (req, res) => {
  try {
    let { email, otp } = req.body;
    let user = await User.findOne({ email: email });
    let currentTime = Math.round(Date.now() / 1000);
    if (currentTime > user.expiringAt) {
      return sendMessageResponse(res, {
        message: "OTP has expired!",
        code: 200,
        status: false,
      });
    } else {
      if (otp == user.otp) {
        let accessToken = await jwt.jwtSign({
          email: user.email,
          userId: user._id,
        });
        user = await User.findOneAndUpdate(
          { email: email },
          {
            $set: {
              isVerified: true,
              accessToken: accessToken,
            },
          },
          { new: true }
        );

        return sendResponse(res, {
          data: { user },
          message: "User Verified",
        });
      } else {
        return sendMessageResponse(res, {
          message: "Invalid OTP!",
          code: 200,
          status: false,
        });
      }
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const userSignIn = async (req, res) => {
  try {
    let { password, email } = req.body;
    let user = await User.findOne({ email: email });
    if (user) {
      const check = await bcrypt.compare(password, user.password);
      if (check) {
        let accessToken = await jwt.jwtSign({
          email: user.email,
          userId: user._id,
        });
        user = await User.findOneAndUpdate(
          { email: email },
          { $set: { accessToken: accessToken, lastLogin: new Date() } },
          { new: true }
        );
        return sendResponse(res, {
          data: { user },
          message: "User LoggedIn",
        });
      } else {
        return sendMessageResponse(res, {
          message: "Password does not Match.",
          code: 401,
          status: false,
        });
      }
    }
    return sendMessageResponse(res, {
      message: "Wrong Credentials",
      code: 401,
      status: false,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    let { email } = req.body;
    let userExists = await User.findOne({ email: email });
    if (!userExists) {
      return sendMessageResponse(res, {
        message: "Email does not exist.",
        code: 200,
        status: false,
      });
    } else {
      let otp = await generateOtp();
      await sendForgotPasswordMail(email, otp);
      await User.findOneAndUpdate(
        { email: email },
        {
          $set: {
            issuedAt: Math.round(Date.now() / 1000),
            expiringAt: Math.round(Date.now() / 1000) + 300,
            otp: otp,
          },
        }
      );
      return sendMessageResponse(res, {
        message: "Otp sent successfully!",
        code: 200,
      });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    let { email, otp } = req.body;
    let user = await User.findOne({ email: email });
    let currentTime = Math.round(Date.now() / 1000);
    let msg = "";
    if (currentTime > user.expiringAt) {
      msg = "expired";
    } else {
      if (otp === user.otp) {
        msg = "success";
      } else {
        msg = "invalid";
      }
    }
    return sendMessageResponse(res, {
      message: msg,
      code: 200,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    let { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    await userModel.findOneAndUpdate(
      { email: email },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );
    return sendMessageResponse(res, {
      message: "Reset Successfully",
      code: 200,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  userSignUp,
  verifyUser,
  userSignIn,
  forgotPassword,
  verifyOtp,
  resetPassword
};
