const User = require("../models/User");

const edit_user = async (req, res, next) => {
  try {
    if (!req.body.password) {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      res.status(201).json(user);
    } else if (req.body.password) {
      let user = await User.findById(req.params.id);
      user.password = req.body.password;
      user = await user.save();
      res.status(201).json(user);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { edit_user };
