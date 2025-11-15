module.exports = {

    index: (req, res) => {
        res.render('index', { title: 'Inicio' });
    },

    home: (req, res) => {
        res.render('index', { title: 'Home' });
    }

};
