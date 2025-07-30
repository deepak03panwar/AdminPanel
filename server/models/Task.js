const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  status: String,
  due_date: Date,
  created_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Task', TaskSchema);
