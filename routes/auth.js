const router = require("express").Router();
const {
  login,
  register,
  logout,
  verification,
  forgotPassword,
  resetPassword,
  deleteUser,
} = require("../controllers/auth");

router.post("/login", login);
router.post("/register/:verifyToken", register);
router.post("/verification", verification);
router.get("/logout", logout);
router.post("/forgotpassword", forgotPassword);
router.patch("/resetpassword/:resetToken", resetPassword);
router.delete("/delete/:id", deleteUser);

module.exports = router;
