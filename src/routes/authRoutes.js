const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Mostrar login y registro
router.get('/login', authController.login);
router.get('/register', authController.register);

// Procesar login y registro
router.post('/login', authController.loginProcess);
router.post('/register', authController.registerProcess);

module.exports = router;