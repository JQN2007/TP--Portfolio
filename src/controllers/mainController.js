// src/controllers/mainController.js
const db = require('../config/db');

module.exports = {
    index: async (req, res) => {
        try {
            const sessionUser = req.session.user || null;

            if (!sessionUser) {
                // No hay user logueado
                return res.render('index', {
                    title: 'Inicio',
                    user: null,
                    projects: []
                });
            }

            // Traer datos actualizados del usuario desde la BD
            const [rows] = await db.query(
                "SELECT id, name, lastname, email, profile_image, bio, cards_json FROM users WHERE id = ?",
                [sessionUser.id]
            );

            const user = rows[0] || sessionUser;

            // parsear cards_json si existe
            let cards = [];
            try {
                cards = user.cards_json ? JSON.parse(user.cards_json) : [];
            } catch (e) {
                cards = [];
            }

            // Traer proyectos (si querés mostrarlos luego)
            const [projects] = await db.query(
                "SELECT id, name, image FROM projects WHERE user_id = ? ORDER BY created_at DESC",
                [sessionUser.id]
            );

            // Render
            res.render('index', {
                title: 'Inicio',
                user,
                cards,
                projects
            });

        } catch (error) {
            console.error("Error en mainController.index", error);
            res.render('index', { title: 'Inicio', user: req.session.user || null, cards: [], projects: [] });
        }
    },

    // Mantené home si lo usás:
   home: (req, res) => {
    res.render('index', {
        title: 'Home',
        user: req.session.user || null,
        cards: [],
        projects: []
    });
}

};
