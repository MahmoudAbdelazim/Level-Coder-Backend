const Problem = require("../models/problem");
const TopicProblems = require("../models/topicProblems");
const UserCompletedProblems = require("../models/userCompletedProblems");

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

exports.toggleSolved = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const problemId = req.body.problem;

    if (!problemId) {
      res.status(400).json({ message: "Problem id cannot be null" });
      return;
    }
    const problem = await Problem.findByPk(problemId);
    if (!problem) {
      res.status(404).json({ message: "Problem not found" });
      return;
    }
    const userCompletedProblem = await UserCompletedProblems.findOne({
      where: { userId: userId, problemId: problemId },
    });
    if (!userCompletedProblem) {
      await UserCompletedProblems.create({
        userId: userId,
        problemId: problemId,
      });
    } else {
      await userCompletedProblem.destroy();
    }
    res.status(200).json({ message: "Solved problem toggled successfully" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
