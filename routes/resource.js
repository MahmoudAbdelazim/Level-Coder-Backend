const express = require("express");

const resourceController = require("../controllers/resourceController");

const router = express.Router();

router.get("/all-resources", resourceController.getAllResources);
router.post("/add-resource", resourceController.addResource);

module.exports = router;
