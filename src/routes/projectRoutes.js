const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Mostrar la página de portfolio
router.get('/portfolio', projectController.list);

// Mostrar formulario para agregar proyecto
router.get('/portfolio/add', projectController.add);

// Procesar creación de proyecto (simulado)
router.post('/portfolio/add', projectController.create);

module.exports = router;
