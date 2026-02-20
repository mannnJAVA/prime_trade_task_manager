import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5001/api/v1/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <Layout>
      <div className="auth-wrapper">
        <div className="card">
          <h2>Login</h2>

          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>Login</button>

          <div className="link-text">
            Don’t have an account? <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
