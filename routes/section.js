const express = require("express");

const sectionController = require("../controllers/sectionController");

const router = express.Router();

router.get("/all-sections", sectionController.getAllSections);

module.exports = router;
