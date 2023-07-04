const Problem = require("../models/problem");
const Resource = require("../models/resource");
const Topic = require("../models/topic");
const TopicProblems = require("../models/topicProblems");
const TopicResources = require("../models/topicResources");
const UserCompletedProblems = require("../models/userCompletedProblems");
const UserCompletedResources = require("../models/userCompletedResources");

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

exports.getAllTopicNames = async (req, res, next) => {
  try {
    const topics = await Topic.findAll({ attributes: ["id", "name"] });
    res.status(200).json({ topics: topics });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getTopic = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ message: "id cannot be null" });
      return;
    }
    const topic = await Topic.findByPk(id);
    if (!topic) {
      res.status(404).json({ message: "Topic not found" });
      return;
    }
    const result = {};
    result.id = topic.id;
    result.name = topic.name;
    result.description = topic.description;
    result.cfProblems = [];
    result.lcProblems = [];
    result.hrProblems = [];
    const topicProblems = await TopicProblems.findAll({
      where: { topicId: id },
    });
    for (const problem of topicProblems) {
      const problemObj = await Problem.findByPk(problem.problemId);
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
    const resources = await TopicResources.findAll({
      where: { topicId: topic.id },
    });
    const resourceObjs = [];
    for (const resource of resources) {
      const resourceObj = await Resource.findByPk(resource.resourceId);
      const obj = {
        id: resourceObj.id,
        title: resourceObj.title,
        link: resourceObj.link,
        platform: resourceObj.platform,
        language: resourceObj.language,
        description: resourceObj.description,
        completed: false,
      };
      if (req.user) {
        const userCompletedResource = await UserCompletedResources.findOne({
          where: { userId: req.user.id, resourceId: resourceObj.id },
        });
        if (userCompletedResource) {
          obj.completed = true;
        }
      }
      resourceObjs.push(obj);
    }
    result.resources = resourceObjs;
    res.status(200).json({ topic: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getTopicByName = async (req, res, next) => {
  try {
    const name = req.params.name;
    if (!name) {
      res.status(400).json({ message: "Name cannot be null" });
      return;
    }
    const topic = await Topic.findOne({ where: { name: name } });
    if (!topic) {
      res.status(404).json({ message: "Topic not found" });
      return;
    }
    const result = {};
    result.id = topic.id;
    result.name = topic.name;
    result.description = topic.description;
    result.cfProblems = [];
    result.lcProblems = [];
    result.hrProblems = [];
    const topicProblems = await TopicProblems.findAll({
      where: { topicId: topic.id },
    });
    for (const problem of topicProblems) {
      const problemObj = await Problem.findByPk(problem.problemId);
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
    const resources = await TopicResources.findAll({
      where: { topicId: topic.id },
    });
    const resourceObjs = [];
    for (const resource of resources) {
      const resourceObj = await Resource.findByPk(resource.resourceId);
      const obj = {
        id: resourceObj.id,
        title: resourceObj.title,
        link: resourceObj.link,
        platform: resourceObj.platform,
        language: resourceObj.language,
        description: resourceObj.description,
        completed: false,
      };
      if (req.user) {
        const userCompletedResource = await UserCompletedResources.findOne({
          where: { userId: req.user.id, resourceId: resourceObj.id },
        });
        if (userCompletedResource) {
          obj.completed = true;
        }
      }
      resourceObjs.push(obj);
    }
    result.resources = resourceObjs;
    res.status(200).json({ topic: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addTopic = async (req, res, next) => {
  try {
    if (req.user.role != "ADMIN") {
      res
        .status(301)
        .json({ message: "User not authorized for this operation" });
      return;
    }
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

exports.deleteTopic = async (req, res, next) => {
  try {
    if (req.user.role != "ADMIN") {
      res
        .status(301)
        .json({ message: "User not authorized for this operation" });
      return;
    }
    const topicId = req.params.id;
    const topic = await Topic.findByPk(topicId);
    if (!topic) {
      res.status(404).json({ message: "Topic not found" });
      return;
    }
    const topicProblems = await TopicProblems.findAll({
      where: { topicId: topicId },
    });
    const topicResources = await TopicResources.findAll({
      where: { topicId: topicId },
    });
    for (const topicProblem of topicProblems) {
      const problem = await Problem.findByPk(topicProblem.problemId);
      await UserCompletedProblems.destroy({
        where: { problemId: problem.id },
      });
      await problem.destroy();
      await topicProblem.destroy();
    }
    for (const topicResource of topicResources) {
      const resource = await Resource.findByPk(topicResource.resourceId);
      await UserCompletedResources.destroy({
        where: { resourceId: resource.id },
      });
      await resource.destroy();
      await topicResource.destroy();
    }
    await topic.destroy();
    res.status(200).json({ message: "Topic deleted successfully" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
