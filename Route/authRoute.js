const express = require("express");
const router = express.Router();
const loginController = require("./../Controller/authController");

router.get("/login", loginController.login);

module.exports = router;