const express = require("express");

const problemController = require("../controllers/problemController");

const router = express.Router();

const authenticate = require("../middleware/authenticate");
const optionalAuthenticate = require("../middleware/optionalAuthenticate");

router.get("/all-problems", problemController.getAllProblems);
router.post("/add-problem", problemController.addProblem);
router.post("/toggle-solved", authenticate, problemController.toggleSolved);
router.get(
  "/problems/:topicId",
  optionalAuthenticate,
  problemController.getProblemsOfTopic
);

module.exports = router;
