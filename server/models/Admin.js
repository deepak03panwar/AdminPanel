const mongoose = require('mongoose');
const MachineTestSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});
module.exports = mongoose.model('MachineTest', MachineTestSchema,"MachineTest");
