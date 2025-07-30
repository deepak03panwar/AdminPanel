const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/adminController');

router.post('/login', adminCtrl.login);
router.post('/forgot-password', adminCtrl.forgotPassword);
router.post('/reset-password', adminCtrl.resetPassword);

module.exports = router;
