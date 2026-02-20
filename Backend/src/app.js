require("./config/db");

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

console.log("App file loaded");

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.get("/", (req, res) => {
  res.json({ message: "THIS IS THE REAL SERVER" });
});
const errorMiddleware = require("./middleware/errorMiddleware");
app.use(errorMiddleware);
module.exports = app;
