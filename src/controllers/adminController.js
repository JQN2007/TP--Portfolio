module.exports = {

    dashboard: (req, res) => {
        res.render("admin/dashboard", {
            title: "Panel de Administración"
        });
    },

    users: (req, res) => {
        // Más adelante: traer usuarios desde DB
        res.render("admin/users", {
            title: "Usuarios registrados"
        });
    },

    projects: (req, res) => {
        // Más adelante: traer proyectos desde DB
        res.render("admin/projects", {
            title: "Proyectos"
        });
    },

    settings: (req, res) => {
        res.render("admin/settings", {
            title: "Configuración del sitio"
        });
    }

};
