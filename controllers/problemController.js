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

exports.getProblemsOfTopic = async (req, res, next) => {
  try {
    const topicId = req.params.topicId;
    const topicProblems = await TopicProblems.findAll({
      where: { topicId: topicId },
    });
    const result = {};
    result.cfProblems = [];
    result.lcProblems = [];
    result.hrProblems = [];
    for (const topicProblem of topicProblems) {
      const problemObj = await Problem.findByPk(topicProblem.problemId);
      const obj = {
        id: problemObj.id,
        title: problemObj.title,
        link: problemObj.link,
        platform: problemObj.platform,
        difficulty: problemObj.difficulty,
        successRate: problemObj.successRate,
        acceptance: problemObj.acceptance,
        solved: false,
      };
      if (req.user) {
        const userCompletedProblem = await UserCompletedProblems.findOne({
          where: { userId: req.user.id, problemId: problemObj.id },
        });
        if (userCompletedProblem) {
          obj.solved = true;
        }
      }
      if (problemObj.platform == "cf") {
        result.cfProblems.push(obj);
      } else if (problemObj.platform == "lc") {
        result.lcProblems.push(obj);
      } else if (problemObj.platform == "hr") {
        result.hrProblems.push(obj);
      }
    }
    res.status(200).json({ problems: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteProblem = async (req, res, next) => {
  try {
    const problemId = req.params.id;
    const problem = await Problem.findByPk(problemId);
    if (!problem) {
      res.status(404).json({ message: "Problem not found" });
      return;
    }
    await UserCompletedProblems.destroy({
      where: { problemId: problem.id },
    });
    await problem.destroy();
    res.status(200).json({ message: "Problem deleted successfully" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
