module.exports = {

    index: (req, res) => {
        res.render('index', { 
            title: 'Inicio',
            user: req.session.user || null,
            projects: []   // ← AGREGADO
        });
    },

    home: (req, res) => {
        res.render('index', { 
            title: 'Home',
            user: req.session.user || null,
            projects: []   // ← AGREGADO
        });
    }

};