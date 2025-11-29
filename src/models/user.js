const db = require('../config/db');

module.exports = {

async findById(id) {
    const [rows] = await db.query(
        "SELECT id, name, lastname, email, profile_image, bio, cards_json FROM users WHERE id = ?",
        [id]
    );
    return rows[0] || null;
},


async updateProfile(id, data) {
    const { name, lastname, bio, profile_image, cards_json } = data;

    await db.query(
        `UPDATE users 
         SET name = ?, 
             lastname = ?, 
             bio = ?, 
             profile_image = ?, 
             cards_json = ?
         WHERE id = ?`,
        [
            name,
            lastname,
            bio,
            profile_image,
            cards_json,
            id
        ]
    );
}

};
