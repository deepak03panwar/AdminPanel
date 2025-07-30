const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const Task = require('../models/Task');

router.get('/', async (req, res) => {
    const employeeCount = await Employee.countDocuments();
    const taskCount = await Task.countDocuments();
    res.json({ employeeCount, taskCount });
});

module.exports = router;
