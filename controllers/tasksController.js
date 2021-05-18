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
    res.status(202).send(aTask.rows[0]);
  } catch (error) {
    res.status(400).send(error);
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
    res.status(400).send(error);
    console.error(error);
  }
};

const update_task_status = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { newStatus } = req.body;

    const updateTask = await pool.query(
      "UPDATE app.tasks SET task_is_completed = $1 WHERE task_id = $2 RETURNING *",
      [newStatus, taskId]
    );

    res.status(200).send(updateTask.rows);
  } catch (error) {
    res.status(400).send(error);
  }
};

const delete_task = async (req, res) => {
  const client = await pool.connect();

  try {
    const { taskId } = req.params;
    await client.query("BEGIN"); // BEGIN transaction

    const deleteSubtasksQuery =
      "DELETE FROM app.subtasks WHERE subtask_task_id = $1 RETURNING *";
    const deleteSubtasksResponse = await client.query(deleteSubtasksQuery, [
      taskId,
    ]);

    const deleteTasksQuery =
      "DELETE FROM app.tasks WHERE task_id = $1 RETURNING *";
    const deleteTasksResponse = await client.query(deleteTasksQuery, [taskId]);

    await client.query("COMMIT"); // If all the above is successfull, COMMIT

    res.status(200).send(deleteTasksResponse.rows);
  } catch (error) {
    console.error(error);
    await client.query("ROLLBACK"); // If errors during transaction, rollback the query
    res.status(400).send(error);
  } finally {
    client.release(); // Release the connection at the end
  }
};

module.exports = {
  create_task,
  get_all,
  get_task,
  update_task,
  update_task_status,
  delete_task,
};
