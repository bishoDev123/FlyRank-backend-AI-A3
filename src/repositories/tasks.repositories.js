const { pool } = require('../db/connection');

async function findAll({ search, status } = {}) {
    let query = "SELECT * FROM tasks";
    const conditions = [];
    const params = [];

    if (search) {
        params.push(`%${search}%`);
        conditions.push(`title ILIKE $${params.length}`);
    }
    if (status !== undefined) {
        params.push(status);
        conditions.push(`done = $${params.length}`);
    }

    if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
    }

    const { rows } = await pool.query(query, params);
    return rows;
}

async function findById(id) {
     const { rows } = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
    return rows[0];
}

function insert(title) {
    const result = db.prepare("INSERT INTO tasks (title) VALUES (?)").run(title);
    return result.lastInsertRowid;
}

function update(id, title, done) {
    db.prepare("UPDATE tasks SET title = ?, done = ? WHERE id = ?").run(title, done, id);
}

function remove(id) {
    db.prepare("DELETE FROM tasks WHERE id = ?").run(id);
}

module.exports = {
    findAll,
    findById,
    insert,
    update,
    remove
};