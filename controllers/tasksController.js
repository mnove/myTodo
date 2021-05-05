const pool = require("../db");

const create_task = async (req, res) => {
  try {
    console.log("userId", req.userId);

    const { description } = req.body;
    const userId = req.userId; // passed from the authMiddleware/verifyJWT

    const newTask = await pool.query(
      "INSERT INTO app.tasks (task_description, task_owner) VALUES ($1, $2) RETURNING *",
      [description, userId]
    );

   
    console.log(newTask.rows[0]); 
    
     res.status(201).send(newTask.rows);
  } catch (error) {
    console.error(error);
  }
};

const get_all = async (req, res) => {
  try {
    const userId = req.userId; // passed from the authMiddleware/verifyJWT
    const allTasks = await pool.query(
      "SELECT * FROM app.tasks WHERE task_owner = $1",
      [userId]
    );
    console.table(allTasks.rows);
    res.json(allTasks.rows);
  } catch (error) {
    console.error(error);
  }
};

const get_task = async (req, res) => {
  try {
    console.log("params", req.params);
    const userId = req.userId; // passed from the authMiddleware/verifyJWT
    const { taskId } = req.params;
    const aTask = await pool.query(
      "SELECT * FROM app.tasks WHERE task_id = $1",
      [taskId]
    );
    console.table(aTask.rows);
    res.json(aTask.rows[0]);
  } catch (error) {
    console.error(error);
  }
};

const update_task = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { description } = req.body;
    const updateTask = await pool.query(
      "UPDATE app.tasks SET task_description = $1 WHERE task_id = $2 RETURNING *",
      [description, taskId]
    );
    console.log(updateTask);
    res.status(202).send(updateTask.rows);
  } catch (error) {
    console.error(error);
  }
};

const delete_task = async (req, res) => {
  try {
    const { taskId } = req.params;
    const deleteTask = await pool.query(
      "DELETE FROM app.tasks WHERE task_id = $1 RETURNING *",
      [taskId]
    );
    console.log(deleteTask);
    res.status(200).send(deleteTask.rows);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  create_task,
  get_all,
  get_task,
  update_task,
  delete_task,
};
