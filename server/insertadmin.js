const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin"); 

mongoose.connect("mongodb+srv://Admin:admin123Admin@adminpanel.aikyw77.mongodb.net/AdminDB?retryWrites=true&w=majority&appName=AdminPanel", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function insertAdmin() {
  const email = "admin@example.com";
  const password = "admin123example()";
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = new Admin({ email, password: hashedPassword });
  await admin.save();
  console.log("Admin inserted");
  mongoose.disconnect();
}

insertAdmin();
