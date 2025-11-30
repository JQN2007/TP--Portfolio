// =====================
//    IMPORTACIONES
// =====================
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
require('dotenv').config();

// =====================
//      APP
// =====================
const app = express();
const PORT = process.env.PORT || 3000;

// =====================
//   MIDDLEWARES
// =====================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(session({
    secret: 'superSecret123',
    resave: false,
    saveUninitialized: false
}));

// Archivos públicos (CSS / JS / imágenes)
app.use(express.static(path.join(__dirname, 'public')));

// Motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'src', 'views'));

// =====================
//         RUTAS
// =====================
app.use('/', require('./src/routes/mainRoutes'));
app.use('/auth', require('./src/routes/authRoutes'));
app.use('/profile', require('./src/routes/profileRoutes'));
app.use('/projects', require('./src/routes/projectRoutes'));
app.use('/admin', require('./src/routes/adminRoutes'));
// después de las otras app.use(...)
app.use('/user', require('./src/routes/userRoutes'));



// =====================
//     ERROR 404
// =====================
app.use((req, res, next) => {
    res.status(404).send('Recurso no encontrado');
});

app.use('/uploads', express.static('uploads'));


// =====================
//   INICIAR SERVIDOR
// =====================
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
