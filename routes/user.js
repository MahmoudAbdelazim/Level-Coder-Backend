const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

const authenticate = require("../middleware/authenticate");

router.put(
  "/update-my-user-data",
  authenticate,
  userController.updateMyUserData
);

module.exports = router;
