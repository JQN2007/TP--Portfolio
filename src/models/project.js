const db = require('../config/db');

const Project = {
    async findByUser(userId) {
        const [rows] = await db.query(
            "SELECT * FROM projects WHERE user_id = ?",
            [userId]
        );
        return rows;
    },

    async create(userId, data) {
        await db.query(
            `INSERT INTO projects (user_id, title, image, file_path)
             VALUES (?, ?, ?, ?)`,
            [userId, data.title, data.image, data.file]
        );
    },

    async delete(id, userId) {
        await db.query(
            "DELETE FROM projects WHERE id = ? AND user_id = ?",
            [id, userId]
        );
    }
};

module.exports = Project;
