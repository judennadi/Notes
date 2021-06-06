const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

const auth = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      try {
        if (err) {
          next(new ErrorResponse("Not an authorized user token", 401));
          req.user = null;
          next();
        } else {
          const user = await User.findById(decodedToken.id);
          req.user = user;
          next();
        }
      } catch (error) {
        next(error);
      }
    });
  } else {
    req.user = null;
    next(new ErrorResponse("Not an authorized user", 401));
  }
};

module.exports = auth;
