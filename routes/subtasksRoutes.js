const express = require("express");
const router = express.Router();

const subtasksController = require("../controllers/subtasksController");
const authMiddleware = require("../middlewares/authMiddleware");

// tasks routes
// routes are scoped to "api/tasks/" in app.js

router.post("/:taskId", authMiddleware.verifyJWT, subtasksController.create_subtask); // Create a subtask
// router.get("/", authMiddleware.verifyJWT, subtasksController.get_all); // Get all subtasks
router.get("/:subtaskId", authMiddleware.verifyJWT, subtasksController.get_subtask); // Get a specific subtask
router.put("/:subtaskId", authMiddleware.verifyJWT, subtasksController.update_subtask); // Update a specific subtask
router.delete("/:subtaskId", authMiddleware.verifyJWT, subtasksController.delete_subtask); // Delete a specific subtask

module.exports = router;
