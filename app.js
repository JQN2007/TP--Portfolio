const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* Middlewares */
app.use(methodOverride('_method'))
app.use(express.static('public')); // sirve archivos html, css, js

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname ,'./src/views'));
app.use(express.urlencoded({ extended: true })); // para leer formularios
app.use(express.json()); // para leer JSON

/* importo las rutas */
const mainRoutes = require('./src/routes/mainRoutes.js');
const authRoutes = require('./src/routes/authRoutes.js');
const projectRoutes = require('./src/routes/projectRoutes.js');

require('dotenv').config();
/* Leemos la constante*/
const PORT = process.env.PORT;

/* uso los archivos de rutas */
app.use('/', mainRoutes);
app.use('/auth', authRoutes);
app.use('/portfolio', projectRoutes);

// Middleware para manejar el error 404
app.use((req, res, next) => {
res.status(404).send('Recurso no encontrado');
});



app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));