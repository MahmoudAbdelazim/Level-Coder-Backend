const Problem = require("../models/problem");
const TopicProblems = require("../models/topicProblems");

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

exports.addProblem = async (req, res, next) => {
  try {
    const title = req.body.title;
    const link = req.body.link;
    const platform = req.body.platform;
    const topicId = req.body.topic;
    const difficulty = req.body.difficulty;
    const successRate = req.body.successRate;
    const acceptance = req.body.acceptance;
    if (!title || !link || !platform || !topicId) {
      res.status(400).json({ message: "Problem data cannot be null" });
      return;
    }
    const problem = await Problem.create({
      title: title,
      link: link,
      platform: platform,
      difficulty: difficulty,
      successRate: successRate,
      acceptance: acceptance,
    });
    const topicProblem = await TopicProblems.create({
      topicId: topicId,
      problemId: problem.id,
    });
    res.status(200).json({ problem: problem });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
