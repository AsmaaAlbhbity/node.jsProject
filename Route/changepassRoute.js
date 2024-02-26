// Import necessary modules and controllers
const express = require('express');
const router = express.Router();
const isAuth = require('../Middleware/authMW');
const passController = require('../Controller/changepassControlller');

// Define the route with the proper callback function
router.put("/changepassword", isAuth, passController.editPassword); // Corrected function name


// Export the router
module.exports = router;
