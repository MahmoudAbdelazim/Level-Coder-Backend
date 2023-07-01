const express = require("express");

const problemController = require("../controllers/problemController");

const router = express.Router();

router.get("/all-problems", problemController.getAllProblems);

module.exports = router;
