const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const requestRoutes = require('./routes/RequestRoutes.js');
// environment variables config
const path = require('path');
require('dotenv').config({
    override: true,
    path: path.join(__dirname, '.env.development')
});

const PORT = process.env.PORT || 3000;

//connect server to database
new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
    console.log('connection to database established!');
})

//middlewares to help run the server with ease
app.use(cors({
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: 'Content-Type, Authorization',
}))

app.use(bodyParser.json());
app.use('/api/requests', requestRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
})