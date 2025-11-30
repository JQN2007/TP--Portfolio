// src/controllers/userController.js
const db = require('../config/db');

exports.updatePhoto = async (req, res) => {
    try {
        if (!req.session.user) return res.status(401).send("No autorizado");

        if (!req.file) return res.redirect('/'); // si no sube archivo, volver

        const filename = req.file.filename;
        const userId = req.session.user.id;

        await db.query("UPDATE users SET profile_image = ? WHERE id = ?", [filename, userId]);

        // actualizar sesión
        req.session.user.profile_image = filename;
        req.session.save(() => res.redirect('/'));
    } catch (error) {
        console.error("Error updatePhoto:", error);
        res.status(500).send("Error subiendo la foto");
    }
};

exports.saveCards = async (req, res) => {
    try {
        if (!req.session.user) return res.status(401).json({ success: false, message: "No autorizado" });

        const cards = req.body.cards; // espera array de tarjetas [{title, description}, ...]
        const userId = req.session.user.id;

        // Guardar JSON (stringify)
        const cardsJson = JSON.stringify(cards || []);
        await db.query("UPDATE users SET cards_json = ? WHERE id = ?", [cardsJson, userId]);

        // Opcional: actualizar sesión con cards
        req.session.user.cards_json = cardsJson;

        res.json({ success: true, cards });
    } catch (error) {
        console.error("Error saveCards:", error);
        res.status(500).json({ success: false, message: "Error guardando tarjetas" });
    }
};
