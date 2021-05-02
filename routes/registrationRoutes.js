const express = require("express");
const router = express.Router();


const registrationController = require("../controllers/registrationController");

// registration routes
// routes are scoped to "api/register/" in app.js

router.post("/", registrationController.register_new_user); // Register a new user to the app


module.exports = router;