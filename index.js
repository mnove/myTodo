const express = require("express");
const app = express();
var morgan = require('morgan')
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;

// process.env.PORT
// process.env.NODE_ENV


// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

if (process.env.NODE_ENV === "production") {
  // server static content 

  app.use(express.static(path.join(__dirname, "client/build")));


}

// ROUTES

// Create a todo
app.post("/todos", async (req, res) => {
  try {
    // console.log(req.body)

    const { description } = req.body;

    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error);
  }
});

// Get all todo tasks

app.get("/todos", async (req, res) => {
  try {
    const allTodo = await pool.query("SELECT * FROM todo");
    res.json(allTodo.rows);
  } catch (error) {
    console.error(error);
  }
});

// Get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    console.log(req.params);
    let todoId = parseInt(req.params.id);
    const aTodo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      todoId,
    ]);

    res.json(aTodo.rows[0]);
  } catch (error) {
    console.error(error);
  }
});

// Update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json("Todo was updated");
  } catch (error) {
    console.error(error);
  }
});

// Delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.json("Todo was deleted");
  } catch (error) {
    console.error(error);
  }
});

// Catch-all method
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
})

app.listen(PORT, () => {
  console.log(
    `################################`,
    "\n",
    `Server has started on port ${PORT}`,
    "\n",
    `################################`
  );
});




