const User = require("../models/User");
const VerifyEmail = require("../models/VerifyEmail");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

const verification = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      next(new ErrorResponse("Email already exist", 400));
    } else {
      const newEmail = await VerifyEmail.create({ email });
      const verifyToken = newEmail.getVerifyToken();
      await newEmail.save();

      const verifyUrl = `http://localhost:3000/register/${verifyToken}`;
      const message = `
      <h3>Complete your registration to enjoy more</h3>
      <p>Please click on the link below to create an account</p>
      <a href=${verifyUrl} clicktracking=off>${verifyUrl}</a>
      `;

      try {
        await sendEmail({
          to: newEmail.email,
          subject: "Complete your Registration",
          text: message,
        });
        res.status(201).json({ email: newEmail.email, data: "Email sent" });
      } catch (error) {
        if (error) {
          await VerifyEmail.findOneAndDelete({ email: newEmail.email });
          return next(new ErrorResponse("email could not be sent", 500));
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  const verificationToken = crypto.createHash("sha256").update(req.params.verifyToken).digest("hex");
  try {
    const newEmail = await VerifyEmail.findOne({
      verificationToken: verificationToken,
      verificationExpire: { $gt: Date.now() },
    });
    if (!newEmail) {
      return next(new ErrorResponse("Sorry, this Registration link has expired", 400));
    } else if (newEmail.email !== email) {
      return next(new ErrorResponse("Email does not match the email we want to verify"));
    } else {
      const user = await User.create({ username, email, password });
      const token = user.getSignedToken();
      res.cookie("token", token, { httpOnly: true, maxAge: process.env.MAX_AGE * 1000 });
      res.cookie("check", "check", { maxAge: process.env.MAX_AGE * 1000 });
      res.status(201).json(user);
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new ErrorResponse("Please provide email and password", 400));
  } else {
    try {
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        next(new ErrorResponse("Invalid email or password", 401));
      }
      const isMatch = await user.matchPasswords(password);
      if (!isMatch) {
        next(new ErrorResponse("Invalid email or password", 401));
      } else {
        const token = user.getSignedToken();
        res.cookie("token", token, { httpOnly: true, maxAge: process.env.MAX_AGE * 1000 });
        res.cookie("check", "check", { maxAge: process.env.MAX_AGE * 1000 });
        res.status(200).json(user);
      }
    } catch (error) {
      next(error);
    }
  }
};

const logout = async (req, res, next) => {
  res.cookie("token", "", { maxAge: 1 });
  res.cookie("check", "", { maxAge: 1 });
  res.json({ message: "user logged out" });
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("User with this Email does not exist", 404));
    } else {
      const resetToken = user.getResetToken();
      await user.save();

      const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`;
      const message = `
      <h3>You have requested a password reset</h3>
      <p>Click on the link below to reset your password</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
      `;

      try {
        await sendEmail({
          to: user.email,
          subject: "Password Reset Request",
          text: message,
        });
        res.status(200).json({ data: "Email Sent" });
      } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        return next(new ErrorResponse("Email could not be sent", 500));
      }
    }
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return next(new ErrorResponse("Sorry, this link has expired!", 400));
    } else {
      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      res.status(201).json({ data: "Password Reset was Successful" });
    }
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const userEmail = await VerifyEmail.findByIdAndDelete(id);
    const user = await User.findByIdAndDelete(id);
    if (user) {
      res.status(200).json({ message: `${user.email} account was deleted successfully` });
    } else if (userEmail) {
      res.status(200).json({ message: `${userEmail.email} account was deleted successfully` });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  register,
  logout,
  verification,
  forgotPassword,
  resetPassword,
  deleteUser,
};
