import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/v1/tasks", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setTasks(res.data);
    } catch (err) {
      navigate("/login");
    }
  };

  const createTask = async () => {
    if (!title || !description) return;

    await axios.post(
      "http://localhost:5001/api/v1/tasks",
      { title, description },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );

    setTitle("");
    setDescription("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5001/api/v1/tasks/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    if (!token) navigate("/login");
    fetchTasks();
  }, []);

  return (
    // <Layout>
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Your Tasks</h2>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Create Task Card */}
      <div className="card" style={{ marginBottom: "30px" }}>
        <h2>Create New Task</h2>

        <input
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={createTask}>Add Task</button>
      </div>

      {/* Task List */}
      {tasks.length === 0 ? (
        <div className="task-card">
          <p>No tasks yet. Create one above.</p>
        </div>
      ) : (
        tasks.map((task) => (
          <div className="task-card" key={task.id}>
            <h3 style={{ marginBottom: "8px" }}>{task.title}</h3>
            <p style={{ marginBottom: "12px" }}>{task.description}</p>
            <button
              style={{
                width: "auto",
                padding: "6px 14px",
                background: "#ef4444",
              }}
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
    //</Layout>
  );
}
