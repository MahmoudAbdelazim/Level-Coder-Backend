const express = require("express");

const topicController = require("../controllers/topicController");
const optionalAuthenticate = require("../middleware/optionalAuthenticate");

const router = express.Router();

router.get("/all-topics", topicController.getAllTopics);
router.get("/topic/:id", optionalAuthenticate, topicController.getTopic);
router.delete("/topic/:id", topicController.deleteTopic);
router.post("/add-topic", topicController.addTopic);

module.exports = router;
