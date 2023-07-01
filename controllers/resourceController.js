const Resource = require("../models/resource");

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
