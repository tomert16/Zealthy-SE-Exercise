const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db');

db.run(`DROP TABLE IF EXISTS requests`, (err) => {
    if (err) return console.error(err.message);
})