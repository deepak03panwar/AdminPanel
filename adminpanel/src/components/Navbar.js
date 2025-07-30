import React from "react";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../utils/auth";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>Dashboard</Link>
        <Link to="/employees" className={location.pathname === "/employees" ? "active" : ""}>Employees</Link>
        <Link to="/tasks" className={location.pathname === "/tasks" ? "active" : ""}>Tasks</Link>
      </div>
      <button className="logout-btn" onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;
