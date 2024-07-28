const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  about: {
    type: String,
  },
  otp: { type: String },
  issuedAt: { type: Number, required: true, default: 0 },
  expiringAt: { type: Number, required: true, default: 0 },
  isVerified: { type: Boolean, default: false },
  accessToken: { type: String },
  lastLogin: { type: Date },
});

module.exports = mongoose.model("User", UserSchema);
