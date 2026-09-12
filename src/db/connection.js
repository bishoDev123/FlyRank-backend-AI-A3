const Database = require('better-sqlite3');

const db = new Database('tasks.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        done BOOLEAN NOT NULL DEFAULT 0
    )
`);

function seedIfEmpty() {
    const seedCount = db.prepare(`SELECT COUNT(*) AS count FROM tasks`).get().count;

    if (seedCount === 0) {
        const insert = db.prepare(`INSERT INTO tasks (title, done) VALUES (?, ?)`);
        insert.run("walk the dog", 0);
        insert.run("take out the trash", 0);
        insert.run("take a shower", 1);
    }

    return seedCount;
}

module.exports = {
    db,
    seedIfEmpty
};