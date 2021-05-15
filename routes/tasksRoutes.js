const express = require("express");
const router = express.Router();

const tasksController = require("../controllers/tasksController");
const authMiddleware = require("../middlewares/authMiddleware");

// tasks routes
// routes are scoped to "api/tasks/" in app.js

router.post("/", authMiddleware.verifyJWT, tasksController.create_task); // Create a task
router.get("/", authMiddleware.verifyJWT, tasksController.get_all); // Get all tasks
router.get("/:taskId", authMiddleware.verifyJWT, tasksController.get_task); // Get a specific task
router.put("/status/:taskId", authMiddleware.verifyJWT, tasksController.update_task_status); // Update a specific task status by task id 
router.put("/:taskId", authMiddleware.verifyJWT, tasksController.update_task); // Update a specific task
router.delete("/:taskId", authMiddleware.verifyJWT, tasksController.delete_task); // Delete a specific task

module.exports = router;
