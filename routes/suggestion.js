const express = require("express");

const suggestionController = require("../controllers/suggestionController");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.get("/all-suggestions", suggestionController.getAllSuggestions);
router.post(
  "/add-suggestion",
  authenticate,
  suggestionController.addSuggestion
);

module.exports = router;
