import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeForm from "../components/EmployeeForm";
import Navbar from "../components/Navbar";
import "./Employees.css";


function Employees() {
  const [employees, setEmployees] = useState([]);
  const [editingEmp, setEditingEmp] = useState(null);

  const fetchEmployees = async () => {
    const res = await axios.get("http://localhost:5000/api/employees");
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const addEmployee = async (data) => {
    await axios.post("http://localhost:5000/api/employees", data);
    fetchEmployees();
  };

  const updateEmployee = async (data) => {
    await axios.put(`http://localhost:5000/api/employees/${editingEmp._id}`, data);
    setEditingEmp(null);
    fetchEmployees();
  };

  const deleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      fetchEmployees();
    }
  };

 return (
  <div>
    <Navbar />
    <div className="employees-container">
      <h2 className="page-title">Employees</h2>

      <div className="employee-form-wrapper">
        <h3>{editingEmp ? "Edit Employee" : "Add Employee"}</h3>
        <EmployeeForm
          onSubmit={editingEmp ? updateEmployee : addEmployee}
          initialData={editingEmp}
          submitLabel={editingEmp ? "Update" : "Add"}
        />
      </div>

      <div className="employee-table-wrapper">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>{new Date(emp.created_at).toLocaleString()}</td>
                <td>
                  <button className="btn edit" onClick={() => setEditingEmp(emp)}>
                    Edit
                  </button>
                  <button className="btn delete" onClick={() => deleteEmployee(emp._id)}>
                    Delete
                  </button>
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

export default Employees;
