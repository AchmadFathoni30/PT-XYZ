const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/users', authController.getAllUsers);
router.post('/update', authController.updateUser);
router.delete('/users/:nik', authController.deleteUser);

module.exports = router;
