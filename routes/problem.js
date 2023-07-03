const express = require("express");

const problemController = require("../controllers/problemController");

const router = express.Router();

router.get("/all-problems", problemController.getAllProblems);
router.post("/add-problem", problemController.addProblem);

module.exports = router;
