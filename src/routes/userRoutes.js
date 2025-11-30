// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const userController = require('../controllers/userController');

// Multer: guardar en public/uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '..', '..', 'public', 'uploads')),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Rutas
router.post('/update-photo', upload.single('newPhoto'), userController.updatePhoto);
router.post('/cards', userController.saveCards); // recibe JSON { cards: [...] }

module.exports = router;
