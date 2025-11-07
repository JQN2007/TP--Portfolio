const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

// Ruta raíz (inicio)
router.get('/', mainController.home);

// Ruta /home (opcional)
router.get('/home', mainController.home);

module.exports = router;