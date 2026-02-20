const pool = require("../config/db");

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const result = await pool.query(
      "INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, description, req.user.id],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET USER TASKS
exports.getTasks = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks WHERE user_id = $1", [
      req.user.id,
    ]);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const result = await pool.query(
      "UPDATE tasks SET title=$1, description=$2 WHERE id=$3 AND user_id=$4 RETURNING *",
      [title, description, id, req.user.id],
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM tasks WHERE id=$1 AND user_id=$2", [
      id,
      req.user.id,
    ]);

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
