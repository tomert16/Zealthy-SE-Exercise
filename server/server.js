const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const {Pool} = require('pg');
const requestRoutes = require('./routes/RequestRoutes.js');
// environment variables config
const path = require('path');
require('dotenv').config({
    override: true,
    path: path.join(__dirname, '.env.development')
});

const PORT = process.env.PORT || 3000;

// Connect server to the PostgreSQL database
    /// Local postgresql database
    // const pool = new Pool({
    //     user: process.env.DB_USER,
    //     host: process.env.DB_HOST,
    //     database: process.env.DB_NAME,
    //     password: process.env.DB_PASSWORD,
    //     port: process.env.DB_PORT,
    // });
    // vercel postgresql database
    const pool = new Pool({
        connectionString: process.env.POSTGRES_URL + "?sslmode=require",
      })

    pool.connect()
    .then(() => console.log('Connected to the PostgreSQL database'))
    .catch((err) => console.error('Error connecting to the database', err));

//middlewares to help run the server with ease
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: 'Content-Type, Authorization',
}))

app.use(bodyParser.json());
app.use('/api/requests', requestRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
})