const express = require("express");
const router = express.Router();
const multer = require("multer");
const userController = require("../controllers/userController");

// Configuración de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "public/uploads"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Cambiar foto
router.post("/update-photo", upload.single("newPhoto"), userController.updatePhoto);

// Agregar tarjeta
router.post("/add-card", userController.addCard);

module.exports = router;
