const Employee = require('../models/Employee');

exports.getAll = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
};

exports.create = async (req, res) => {
  const newEmp = new Employee(req.body);
  await newEmp.save();
  res.json(newEmp);
};

exports.update = async (req, res) => {
  const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(emp);
};

exports.delete = async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Deleted' });
};
