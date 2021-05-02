const pool = require("../db");


const create_todo = async (req, res) => {
  try {
    // console.log(req.body)

    const { title } = req.body;

    const newTodo = await pool.query(
      "INSERT INTO app.todo (title) VALUES($1) RETURNING *",
      [title]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error);
  }
};

const get_all = async (req, res) => {
  try {
    const allTodo = await pool.query("SELECT * FROM app.todo");
    res.json(allTodo.rows);
  } catch (error) {
    console.error(error);
  }
};

const get_todo = async (req, res) => {
  try {
    console.log(req.params);
    let todoId = parseInt(req.params.id);
    const aTodo = await pool.query("SELECT * FROM app.todo WHERE id = $1", [
      todoId,
    ]);

    res.json(aTodo.rows[0]);
  } catch (error) {
    console.error(error);
  }
};

const update_todo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const updateTodo = await pool.query(
      "UPDATE app.todo SET title = $1 WHERE id = $2",
      [title, id]
    );
    res.json("Todo was updated");
  } catch (error) {
    console.error(error);
  }
};

const delete_todo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM app.todo WHERE id = $1", [
      id,
    ]);

    res.json("Todo was deleted");
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  create_todo,
  get_all,
  get_todo,
  update_todo,
  delete_todo,
};
