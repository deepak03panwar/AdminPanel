import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "../components/TaskForm";
import Navbar from "../components/Navbar";
import "./Tasks.css";


function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const fetchData = async () => {
    const [taskRes, empRes] = await Promise.all([
      axios.get("http://localhost:5000/api/tasks"),
      axios.get("http://localhost:5000/api/employees"),
    ]);
    setTasks(taskRes.data);
    setEmployees(empRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addTask = async (data) => {
    await axios.post("http://localhost:5000/api/tasks", data);
    fetchData();
  };

  const updateTask = async (data) => {
    await axios.put(`http://localhost:5000/api/tasks/${editingTask._id}`, data);
    setEditingTask(null);
    fetchData();
  };

  const deleteTask = async (id) => {
    if (window.confirm("Delete this task?")) {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchData();
    }
  };

 return (
  <div>
    <Navbar />
    <div className="tasks-container">
      <h2 className="page-title">Tasks</h2>

      <div className="task-form-wrapper">
        <h3>{editingTask ? "Edit Task" : "Add Task"}</h3>
        <TaskForm
          onSubmit={editingTask ? updateTask : addTask}
          initialData={editingTask}
          employees={employees}
          submitLabel={editingTask ? "Update" : "Add"}
        />
      </div>

      <div className="task-table-wrapper">
        <table className="task-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Assigned To</th>
              <th>Status</th>
              <th>Due</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t._id}>
                <td>{t.title}</td>
                <td>{t.description}</td>
                <td>{t.employee_id?.name || "Unassigned"}</td>
                <td>{t.status}</td>
                <td>{new Date(t.due_date).toLocaleDateString()}</td>
                <td>{new Date(t.created_at).toLocaleString()}</td>
                <td>
                  <button className="btn edit" onClick={() => setEditingTask(t)}>Edit</button>
                  <button className="btn delete" onClick={() => deleteTask(t._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

}

export default Tasks;
