const Section = require("../models/section");

exports.getAllSections = async (req, res, next) => {
  try {
    const sections = await Section.findAll();
    res.status(200).json({ sections: sections });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
