const Resource = require("../models/resource");
const TopicResources = require("../models/topicResources");
const UserCompletedResources = require("../models/userCompletedResources");

exports.getAllResources = async (req, res, next) => {
  try {
    const resources = await Resource.findAll();
    res.status(200).json({ resources: resources });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addResource = async (req, res, next) => {
  try {
    const title = req.body.title;
    const link = req.body.link;
    const platform = req.body.platform;
    const topicId = req.body.topic;
    const language = req.body.language;
    const description = req.body.description;
    if (!title || !link || !platform || !topicId || !language) {
      res.status(400).json({ message: "Resource data cannot be null" });
      return;
    }
    const resource = await Resource.create({
      title: title,
      link: link,
      platform: platform,
      language: language,
      description: description,
    });
    const topicResources = await TopicResources.create({
      topicId: topicId,
      resourceId: resource.id,
    });
    res.status(200).json({ resource: resource });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.toggleCompleted = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const resourceId = req.body.resource;

    if (!resourceId) {
      res.status(400).json({ message: "Resource id cannot be null" });
      return;
    }
    const resource = await Resource.findByPk(resourceId);
    if (!resource) {
      res.status(404).json({ message: "Resouce not found" });
      return;
    }
    const userCompletedResource = await UserCompletedResources.findOne({
      where: { userId: userId, resourceId: resourceId },
    });
    if (!userCompletedResource) {
      await UserCompletedResources.create({
        userId: userId,
        resourceId: resourceId,
      });
    } else {
      await userCompletedResource.destroy();
    }
    res
      .status(200)
      .json({ message: "Completed Resource toggled successfully" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getResourcesOfTopic = async (req, res, next) => {
  try {
    const topicId = req.params.topicId;
    const topicResources = await TopicResources.findAll({
      where: { topicId: topicId },
    });
    const result = [];
    for (const topicResource of topicResources) {
      const resourceObj = await Resource.findByPk(topicResource.resourceId);
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
      result.push(obj);
    }
    res.status(200).json({ resources: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteResource = async (req, res, next) => {
  try {
    const resourceId = req.params.id;
    const resource = await Resource.findByPk(resourceId);
    if (!resource) {
      res.status(404).json({ message: "Resource not found" });
      return;
    }
    await UserCompletedResources.destroy({
      where: { resourceId: resource.id },
    });
    await resource.destroy();
    res.status(200).json({ message: "Resource deleted successfully" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
