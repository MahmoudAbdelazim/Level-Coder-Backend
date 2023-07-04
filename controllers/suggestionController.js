const Suggestion = require("../models/suggestion");

exports.getAllSuggestions = async (req, res, next) => {
  try {
    const suggestions = await Suggestion.findAll({ order: ["id", "DESC"] });
    res.status(200).json({ suggestions: suggestions });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addSuggestion = async (req, res, next) => {
  try {
    const id = req.user.id;
    const type = req.body.type;
    const topic = req.body.topic;
    const link = req.body.link;
    const message = req.body.message;

    const suggestion = await Suggestion.create({
      type: type,
      topic: topic,
      link: link,
      message: message,
      userId: id,
    });

    res.status(200).json({ message: "Suggestion added successfully" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
