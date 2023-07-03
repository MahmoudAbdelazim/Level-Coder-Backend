const Problem = require("../models/problem");
const Topic = require("../models/topic");
const TopicProblems = require("../models/topicProblems");

exports.getAllTopics = async (req, res, next) => {
  try {
    const topics = await Topic.findAll();
    const results = [];
    for (const topic of topics) {
      const problems = await TopicProblems.findAll({
        where: { topicId: topic.id },
      });
      let cfCount = 0,
        lcCount = 0,
        hrCount = 0;
      for (const problem of problems) {
        const problemObj = await Problem.findByPk(problem.problemId);
        if (problemObj.platform == "cf") cfCount++;
        else if (problemObj.platform == "lc") lcCount++;
        else if (problemObj.platform == "hr") hrCount++;
      }
      results.push({
        id: topic.id,
        name: topic.name,
        description: topic.description,
        cfCount: cfCount,
        lcCount: lcCount,
        hrCount: hrCount,
      });
    }
    res.status(200).json({ topics: results });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addTopic = async (req, res, next) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    if (!name || !description) {
      res.status(400).json({ message: "Topic data cannot be null" });
      return;
    }
    const topic = await Topic.create({
      name: name,
      description: description,
    });
    res.status(200).json({ topic: topic });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
