const Problem = require("../models/problem");

exports.getAllProblems = async (req, res, next) => {
  try {
    const problems = await Problem.findAll();
    res.status(200).json({ problems: problems });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
