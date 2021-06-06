const mongoose = require("mongoose");
const crypto = require("crypto");

const verifyEmailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    lowercase: true,
    match: [/.+\@.+\..+/, "Please provide a valid email"],
  },
  verificationToken: String,
  verificationExpire: Date,
});

verifyEmailSchema.methods.getVerifyToken = function () {
  const verifyToken = crypto.randomBytes(20).toString("hex");
  this.verificationToken = crypto.createHash("sha256").update(verifyToken).digest("hex");
  this.verificationExpire = Date.now() + 24 * (60 * 60 * 1000);
  return verifyToken;
};

const VerifyEmail = mongoose.model("VerifyEmail", verifyEmailSchema);
module.exports = VerifyEmail;
