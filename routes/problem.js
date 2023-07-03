const express = require("express");

const problemController = require("../controllers/problemController");

const router = express.Router();

const authenticate = require("../middleware/authenticate");

router.get("/all-problems", problemController.getAllProblems);
router.post("/add-problem", problemController.addProblem);
router.post("/toggle-solved", authenticate, problemController.toggleSolved);

module.exports = router;
