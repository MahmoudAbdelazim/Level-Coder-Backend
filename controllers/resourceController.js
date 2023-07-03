const Resource = require("../models/resource");
const TopicResources = require("../models/topicResources");

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
