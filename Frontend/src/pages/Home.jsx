import Layout from "../components/Layout";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Layout>
      <div className="auth-wrapper">
        <div className="card">
          <h2>Welcome to PrimeTrade</h2>
          <p style={{ textAlign: "center", marginBottom: "20px" }}>
            Secure Task Management with JWT Authentication & Role-Based Access
          </p>

          <Link to="/login">
            <button>Login</button>
          </Link>

          <br />
          <br />

          <Link to="/register">
            <button className="secondary-btn">Register</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
