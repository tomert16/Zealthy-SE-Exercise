const { Pool } = require('pg');

//create a new sqlite3 database
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});;

//create the request table if it doesn't exist
pool.query(`CREATE TABLE IF NOT EXISTS requests (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        reason TEXT NOT NULL,
        status TEXT DEFAULT 'New' NOT NULL,
        date TEXT NOT NULL
    );`,
    (err, res) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Request table created!');
        }
    });

//model functions to handle the database CRUD operations
const RequestModel = {
    createRequest: (name, email, reason, date, callback) => {
        const query = {
            text: 'INSERT INTO requests (name, email, reason, date) VALUES ($1, $2, $3, $4) RETURNING id',
            values: [name, email, reason, date]
        };
        pool.query(query, (err, res) => {
            if (err) {
                console.error('Error creating request', err.message);
                callback(err);
            } else {
                callback(null);
            }
        })
    },
    allRequests: (callback) => {
        const query = `SELECT * FROM requests;`;
        pool.query(query, (err, res) => {
            if (err) {
                console.error('Error getting requests', err.message);
                callback(err);
            } else {
                callback(null, res.rows);
            }
        });
    },
    getRequestById: (id, callback) => {
        const query = {
            text: 'SELECT * FROM requests WHERE id = $1',
            values: [id]
        };
        pool.query(query, (err, res) => {
            if (err) {
                console.error('Error getting request', err.message);
                callback(err);
            } else {
                const request = res.rows[0] || null;
                callback(null, request);
            }
        });
    },
    updateRequest: (id, status, callback) => {
        const query = {
            text: 'UPDATE requests SET status = $1 WHERE id = $2',
            values: [status, id]
        };
        pool.query(query, (err, res) => {
            if (err) {
                console.error('Error updating request', err.message);
                callback(err);
            } else {
                callback(null, res.changes);
            }
        });
    }
}

module.exports = { RequestModel };


