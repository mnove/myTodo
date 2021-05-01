const express = require("express");
const router = express.Router();

const todoController = require("../controllers/todoController");

// to do routes
// routes are scoped to "api/todo/" in app.js

router.post("/", todoController.create_todo); // Create a todo
router.get("/", todoController.get_all); // Get all todos
router.get("/:id", todoController.get_todo); // Get a specific todo
router.put("/:id", todoController.update_todo); // Update a specific todo
router.delete("/:id", todoController.delete_todo); // Delete a specific todo

module.exports = router;
