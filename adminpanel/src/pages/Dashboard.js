import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./Dashboard.css";


function Dashboard() {
  const [empCount, setEmpCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const emp = await axios.get("http://localhost:5000/api/employees");
      const tasks = await axios.get("http://localhost:5000/api/tasks");
      setEmpCount(emp.data.length);
      setTaskCount(tasks.data.length);
    };
    fetchCounts();
  }, []);

 return (
  <div>
    <Navbar />
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Total Employees</h3>
          <p>{empCount}</p>
        </div>
        <div className="dashboard-card">
          <h3>Total Tasks</h3>
          <p>{taskCount}</p>
        </div>
      </div>
    </div>
  </div>
);

}

export default Dashboard;
