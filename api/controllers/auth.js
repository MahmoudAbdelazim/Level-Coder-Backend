const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = async (req, res, next) => {
  const username = req.body.username;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;

  if (!username || !firstName || !lastName || !password) {
    res.status(400).json({ message: "Signup Data Missing" });
    return;
  }
  try {
    const presentUser = await User.findOne({ where: { username: username } });
    if (presentUser) {
      res.status(401).json({ message: "Username already registered" });
      return;
    }
    const hashedPw = await bcrypt.hash(password, 12);
    const user = await User.create({
      username: username,
      password: hashedPw,
      firstName: firstName,
      lastName: lastName,
      role: "USER",
    });
    console.log(user);
    res.status(200).json({ message: "User signed up successfully!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    let user = await User.findOne({ where: { username: username } });
    if (!user) {
      res.status(404).json({ message: "Username Not Found" });
    } else {
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        res.status(401).json({ message: "Wrong Password" });
      } else {
        const token = jwt.sign(
          {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
          },
          "somesupersecretsecret"
        );
        res.status(200).json({
          token: token,
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        });
      }
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
