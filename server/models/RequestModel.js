const sqlite3 = require('sqlite3').verbose();

//create a new sqlite3 database
const db = new sqlite3.Database('./database.db');

//create the request table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        reason TEXT NOT NULL,
        status TEXT DEFAULT "New" NOT NULL,
        date TEXT NOT NULL
    );
`);

//model functions to handle the database CRUD operations
const RequestModel = {
    createRequest: (name, email, reason, date, callback) => {
        db.run(
            `INSERT INTO requests (name, email, reason, date) VALUES (?,?,?,?);`,
            [name, email, reason, date],
            (err) => {
                if (err) {
                    console.error(err);
                    callback(err);
                } else {
                    callback(null)
                }
            }
        )
    },
    allRequests: (callback) => {
        db.all(`SELECT * FROM requests`, (err, rows) => {
            if (err) {
                console.error(err.message);
                callback(err);
            } else {
                callback(null, rows);
            }
        })
    },
    getRequestById: (id, callback) => {
        db.all(
            `SELECT * FROM requests WHERE id = ?`,
            [id],
            (err, rows) => {
                if (err) {
                    console.error(err.message);
                    callback(err);
                } else {
                    const request = rows[0] || null;
                    callback(null, request);
                }
            }
        )
    },
    updateRequest: (id, status, callback) => {
        db.run(
            `UPDATE requests SET status = ? WHERE id = ?`,
            [status, id],
            (err) => {
                if (err) {
                    console.error(err.message);
                    callback(err);
                } else {
                    callback(null, this.changes);
                }
            }
        )
    }
}

//close the database connection
const closedDB = () => {
    db.close((err) => {
        if (err) return console.error(err.message);
    });
};

module.exports = { RequestModel, closedDB };


