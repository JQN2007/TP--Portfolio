const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/projects/add', projectController.addProject);

module.exports = router;

