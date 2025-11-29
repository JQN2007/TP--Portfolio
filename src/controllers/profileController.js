const User = require('../models/user');

module.exports = {

    async edit(req, res) {
        // Validar sesión correcta
        if (!req.session.user) return res.redirect('/auth/login');

        const userId = req.session.user.id;
        const user = await User.findById(userId);

        res.render('profile/editProfile', { user });
    },

    async update(req, res) {
        try {
            if (!req.session.user) return res.redirect('/auth/login');

            const userId = req.session.user.id;

            const {
                first_name,
                last_name,
                bio,
                cards_count
            } = req.body;

            const profile_image = req.file ? req.file.filename : null;

            const data = {
                first_name,
                last_name,
                bio,
                profile_image,
                cards_json: JSON.stringify({ count: cards_count })
            };

            await User.updateProfile(userId, data);

            // Actualizar la sesión
if (profile_image) req.session.user.profile_image = profile_image;
req.session.user.name = first_name;
req.session.user.lastname = last_name;
req.session.user.bio = bio;


            req.session.save(() => {
    res.redirect('/');
});

        } catch (error) {
            console.error("Error en profileController.update", error);
            res.status(500).send("Error actualizando el perfil");
        }
    }

};
