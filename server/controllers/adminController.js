const Admin = require('../models/Admin');
// import Admin from '../models/Admin'
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Admin Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email");
    console.log(email,password);
    const admin = await Admin.findOne({ email: email });
    console.log(admin);

    if (!admin) {
      console.log(`Login failed: No admin found with email ${email}`);
      return res.status(401).json({ msg: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      console.log(`Login failed: Password mismatch for ${email}`);
      return res.status(401).json({ msg: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    console.log(token);

    res.json({ token, admin });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) return res.status(404).json({ msg: 'Admin not found' });

    const resetToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: '10m',
    });

    const link = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    res.json({ resetLink: link });
  } catch (err) {
    console.error('Forgot Password Error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hashed = await bcrypt.hash(newPassword, 10);
    await Admin.findByIdAndUpdate(decoded.id, { password: hashed });

    res.json({ msg: 'Password updated successfully' });
  } catch (err) {
    console.error('Reset Password Error:', err);
    res.status(400).json({ msg: 'Invalid or expired token' });
  }
};
