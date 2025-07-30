import React, { useState, useEffect } from "react";

const EmployeeForm = ({ onSubmit, initialData, submitLabel }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
      setDepartment(initialData.department);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email, department });
    setName("");
    setEmail("");
    setDepartment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} required onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input value={email} required onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input value={department} required onChange={(e) => setDepartment(e.target.value)} placeholder="Department" />
      <button type="submit">{submitLabel}</button>
    </form>
  );
};

export default EmployeeForm;
