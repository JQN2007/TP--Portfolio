const db = require("../database/db");

// Cambiar la foto del usuario
exports.updatePhoto = (req, res) => {
    const userId = req.session.user.id;
    const filename = req.file?.filename;

    if (!filename) return res.redirect("/");

    db.query(
        "UPDATE users SET profile_image = ? WHERE id = ?",
        [filename, userId],
        () => res.redirect("/")
    );
};

// Agregar tarjeta
exports.addCard = (req, res) => {
    const { title, desc } = req.body;
    const userId = req.session.user.id;

    db.query(
        "INSERT INTO user_cards (user_id, title, description) VALUES (?, ?, ?)",
        [userId, title, desc],
        (err) => {
            if (err) return res.json({ success: false });
            res.json({ success: true });
        }
    );
};

// Cargar tarjetas al index
exports.getUserCards = (userId, callback) => {
    db.query(
        "SELECT * FROM user_cards WHERE user_id = ?",
        [userId],
        (err, rows) => callback(rows)
    );
};
