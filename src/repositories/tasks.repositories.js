const { pool } = require('../db/connection');

function findAll({ search, status } = {}) {
    let query = "SELECT * FROM tasks";
    const conditions = [];
    const params = [];

    if (search) {
        conditions.push("title LIKE ?");
        params.push(`%${search}%`);
    }
    if (status !== undefined) {
        conditions.push("done = ?");
        params.push(status);
    }

    if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
    }

    return db.prepare(query).all(...params);
}

function findById(id) {
    return db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
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