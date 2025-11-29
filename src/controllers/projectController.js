const Project = require('../models/project');

module.exports = {

    list: async (req, res) => {
        const projects = await Project.findByUser(req.session.user.id);
        res.render('portfolio/index', { title: "Mis proyectos", projects });
    },

    add: (req, res) => {
        res.render('portfolio/addProject', { title: "Agregar Proyecto" });
    },

    create: async (req, res) => {
        const { title } = req.body;

        const image = req.files?.projectImage?.[0]?.filename || null;
        const file = req.files?.projectFile?.[0]?.filename || null;

        await Project.create(req.session.user.id, {
            title,
            image,
            file
        });

        res.redirect('/projects');
    },

    delete: async (req, res) => {
        await Project.delete(req.params.id, req.session.user.id);
        res.redirect('/projects');
    }
};
