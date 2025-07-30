const express = require('express');
const router = express.Router();
const empCtrl = require('../controllers/employeeController');

router.get('/', empCtrl.getAll);
router.post('/', empCtrl.create);
router.put('/:id', empCtrl.update);
router.delete('/:id', empCtrl.delete);

module.exports = router;
