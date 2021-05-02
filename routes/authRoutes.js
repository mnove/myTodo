const express = require("express");
const router = express.Router();


const authController = require("../controllers/authController");

// Auth routes
// routes are scoped to "api/auth/" in app.js

router.post("/", authController.login); // Login the user 


module.exports = router;