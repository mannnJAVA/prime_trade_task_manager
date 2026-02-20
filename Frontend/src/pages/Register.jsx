import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5001/api/v1/auth/register", {
        name,
        email,
        password,
      });
      navigate("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <Layout>
      <div className="auth-wrapper">
        <div className="card">
          <h2>Create Account</h2>

          <input
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleRegister}>Create Account</button>

          <div className="link-text">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
