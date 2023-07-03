const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.updateMyUserData = async (req, res, next) => {
  try {
    const id = req.user.id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    if (!firstName || !lastName || !oldPassword) {
      res.status(400).json({ message: "User data cannot be null" });
      return;
    }
    const isEqual = await bcrypt.compare(oldPassword, user.password);
    if (!isEqual) {
      res.status(401).json({ message: "Old password is incorrect" });
      return;
    }
    user.firstName = firstName;
    user.lastName = lastName;
    if (newPassword) {
      const hashedPw = await bcrypt.hash(newPassword, 12);
      user.password = hashedPw;
    }
    await user.save();
    res.status(200).json({ message: "User data updated successfully" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
