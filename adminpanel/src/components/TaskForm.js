import React, { useEffect, useState } from "react";

const TaskForm = ({ onSubmit, initialData, employees, submitLabel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [status, setStatus] = useState("Pending");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setEmployeeId(initialData.employee_id?._id || initialData.employee_id);
      setStatus(initialData.status);
      setDueDate(initialData.due_date?.substring(0, 10));
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, employee_id: employeeId, status, due_date: dueDate });
    setTitle("");
    setDescription("");
    setEmployeeId("");
    setStatus("Pending");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} required onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={description} required onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      
      <select value={employeeId} required onChange={(e) => setEmployeeId(e.target.value)}>
        <option value="">Assign to Employee</option>
        {employees.map((emp) => (
          <option key={emp._id} value={emp._id}>
            {emp.name} ({emp.department})
          </option>
        ))}
      </select>

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <input type="date" value={dueDate} required onChange={(e) => setDueDate(e.target.value)} />

      <button type="submit">{submitLabel}</button>
    </form>
  );
};

export default TaskForm;
