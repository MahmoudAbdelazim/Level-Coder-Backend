const express = require("express");

const resourceController = require("../controllers/resourceController");

const router = express.Router();

const authenticate = require("../middleware/authenticate");
const optionalAuthenticate = require("../middleware/optionalAuthenticate");

router.get("/all-resources", resourceController.getAllResources);
router.post("/add-resource", authenticate, resourceController.addResource);
router.delete("/resource/:id", authenticate, resourceController.deleteResource);
router.post(
  "/toggle-completed",
  authenticate,
  resourceController.toggleCompleted
);
router.get(
  "/resources/:topicId",
  optionalAuthenticate,
  resourceController.getResourcesOfTopic
);

module.exports = router;
