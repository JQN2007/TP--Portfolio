const db = require('../config/db');
const bcrypt = require('bcryptjs');

module.exports = {

    // -------------------------------------------------------
    // 🔹 Mostrar Login
    // -------------------------------------------------------
    login: (req, res) => {
        res.render('auth/login', { title: 'Iniciar sesión' });
    },

    // -------------------------------------------------------
    // 🔹 Mostrar Registro
    // -------------------------------------------------------
    register: (req, res) => {
        res.render('auth/register', { title: 'Crear cuenta' });
    },

    // -------------------------------------------------------
// 🔹 Procesar Registro → Enviar directo al INDEX
// -------------------------------------------------------
registerProcess: async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    try {
        // 1. ¿Existe el email?
        const [exists] = await db.query(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if (exists.length > 0) {
            return res.send("❌ El email ya está registrado");
        }

        // 2. Encriptar password
        const hashed = bcrypt.hashSync(password, 10);

        // 3. Guardar usuario en columnas reales
        const [result] = await db.query(
            `INSERT INTO users (name, lastname, email, password)
             VALUES (?, ?, ?, ?)`,
            [first_name, last_name, email, hashed]
        );

        // 4. Crear sesión
        req.session.user = {
            id: result.insertId,
            name: first_name,
            lastname: last_name,
            email,
            profile_image: "default.jpg"
        };

        req.session.save(() => {
            res.redirect('/');
        });

    } catch (error) {
        console.log(error);
        return res.send("❌ Error al registrar usuario");
    }
},


    // -------------------------------------------------------
    // 🔹 Procesar Login
    // -------------------------------------------------------
    loginProcess: async (req, res) => {
        const { email, password } = req.body;

        try {
            const [rows] = await db.query(
                "SELECT * FROM users WHERE email = ?",
                [email]
            );

            if (rows.length === 0) {
                return res.send("❌ Usuario no encontrado");
            }

            const user = rows[0];

            // Comparar passwords
            const ok = bcrypt.compareSync(password, user.password);
            if (!ok) return res.send("❌ Contraseña incorrecta");

            // Crear sesión
            req.session.user = {
                id: user.id,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                profile_image: user.profile_image
            };

            res.redirect('/');

        } catch (error) {
            console.log(error);
            res.send("❌ Error al iniciar sesión");
        }
    },

    // -------------------------------------------------------
    // 🔹 Logout
    // -------------------------------------------------------
    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/');
    }
};
