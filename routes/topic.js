const express = require("express");

const topicController = require("../controllers/topicController");

const router = express.Router();

router.get("/all-topics", topicController.getAllTopics);
router.post("/add-topic", topicController.addTopic);

module.exports = router;
