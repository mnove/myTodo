const pool = require("../db");

const create_subtask = async (req, res) => {
  try {
    console.log("userId", req.userId);

    const { description } = req.body;
    const { taskId } = req.params;

    const newSubtask = await pool.query(
      "INSERT INTO app.subtasks (subtask_description, subtask_task_id) VALUES ($1, $2) RETURNING *",
      [description, taskId]
    );

    console.log(newSubtask.rows[0]);

    res.status(201).send(newSubtask.rows);
  } catch (error) {
    res.status(400).send(error);
  }
};

// const get_all = async (req, res) => {
//   try {
//     const userId = req.userId; // passed from the authMiddleware/verifyJWT
//     const allTasks = await pool.query(
//       "SELECT * FROM app.tasks WHERE task_owner = $1",
//       [userId]
//     );
//     console.table(allTasks.rows);
//     res.json(allTasks.rows);
//   } catch (error) {
//     console.error(error);
//   }
// };

const get_subtask = async (req, res) => {
  try {
    const { subtaskId } = req.params;
    const aSubtask = await pool.query(
      "SELECT * FROM app.subtasks WHERE subtask_id = $1",
      [subtaskId]
    );
    console.table(aSubtask.rows);
    res.status(201).send(aSubtask.rows);
  } catch (error) {
      console.log(error)
    res.status(400).send(error);
  }
};

const update_subtask = async (req, res) => {
  try {
    const { subtaskId } = req.params;
    const { description } = req.body;
    const updateSubtask = await pool.query(
      "UPDATE app.subtasks SET subtask_description = $1 WHERE subtask_id = $2 RETURNING *",
      [description, subtaskId]
    );
    console.log(updateSubtask);
    res.status(202).send(updateSubtask.rows);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
    
  }
};

const delete_subtask = async (req, res) => {
  try {
    const { subtaskId } = req.params;
    const deleteSubtask = await pool.query(
      "DELETE FROM app.subtasks WHERE subtask_id = $1 RETURNING *",
      [subtaskId]
    );
    console.log(deleteSubtask);
    res.status(200).send(deleteSubtask.rows);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

const get_all_subtask_by_taskId = async (req, res) => {
  try {
    const { taskId } = req.params;
    const getAllSubtasksByTaskId = await pool.query(
      "SELECT * FROM app.subtasks WHERE subtask_task_id = $1",
      [taskId]
    );
    console.table(getAllSubtasksByTaskId.rows);
    res.status(200).send(getAllSubtasksByTaskId.rows);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

module.exports = {
  create_subtask,
  get_subtask,
  update_subtask,
  delete_subtask,
  get_all_subtask_by_taskId
};
