const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Middleware para imagen
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// Rutas corregidas
router.get('/edit', profileController.edit);

router.post('/update', upload.single('profile_image'), profileController.update);

module.exports = router;
