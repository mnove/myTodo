const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const authController = require("../controllers/authController");

// Auth routes
// routes are scoped to "api/auth/" in app.js

router.post("/login", authController.login); // Login the user 
router.get("/logout", authController.logout); // Logout the user 
router.get("/verify-auth", authMiddleware.verifyJWT, authController.verifyAuthStatus); // Verify the auth status of the current user

module.exports = router;


