module.exports = {

    list: (req, res) => {
        res.render('portfolio/index', { title: 'Mis proyectos' });
    },

    add: (req, res) => {
        res.render('portfolio/addProject', { title: 'Agregar proyecto' });
    },

    create: (req, res) => {
        const { title, description } = req.body;
        res.send(`(Simulado) Proyecto creado: ${title}`);
    }

};
