const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const {
  userSignUp,
  verifyUser,
  userSignIn,
  forgotPassword,
  verifyOtp,
  resetPassword,
} = require("../controllers/user");

// Signup user
router.post(
  "/create/user",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  body("firstName").isLength({ min: 3 }),
  body("lastName").isLength({ min: 3 }),
  userSignUp
);

// Verify user
router.post(
  "/verify/user",
  body("email").isEmail(),
  body("otp").isLength({ min: 4 }),
  verifyUser
);

// Login user
router.post(
  "/login/user",
  body("email").isEmail(),
  body("password").isLength({ min: 4 }),
  userSignIn
);

// Forgot password user
router.post("/forgot-password/user", body("email").isEmail(), forgotPassword);

// Verify OTP user
router.post("/verify-otp/user", verifyOtp);

// Reset password user
router.post("/reset-password/user", resetPassword);

module.exports = router;
