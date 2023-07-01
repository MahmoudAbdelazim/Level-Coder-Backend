const Topic = require("../models/topic");

exports.getAllTopics = async (req, res, next) => {
  try {
    const topics = await Topic.findAll();
    res.status(200).json({ topics: topics });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
