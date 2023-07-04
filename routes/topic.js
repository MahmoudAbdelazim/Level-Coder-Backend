const express = require("express");

const topicController = require("../controllers/topicController");
const optionalAuthenticate = require("../middleware/optionalAuthenticate");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

router.get("/all-topics", topicController.getAllTopics);
router.get("/topic/:id", optionalAuthenticate, topicController.getTopic);
router.get(
  "/topic-by-name/:name",
  optionalAuthenticate,
  topicController.getTopicByName
);
router.delete("/topic/:id", authenticate, topicController.deleteTopic);
router.post("/add-topic", authenticate, topicController.addTopic);

module.exports = router;
