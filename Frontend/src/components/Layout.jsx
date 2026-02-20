import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <>
      <div className="navbar">
        <div className="nav-title">PrimeTrade Task Manager</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </div>

      {children}
    </>
  );
}
