const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const { Client } = require('pg');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

const db = new Client({
    host: 'localhost',
    port: 5432,                                             // Postgres Details to connect to database
    database: 'Hackathon',
    user: 'postgres',
    password: 'root',
  });

db.connect()
    .then(() => {
    console.log('Connected to database');                   // If the database is connected or not
})
    .catch((err) => {
    console.error('Error connecting to database', err);
});

app.post("/api/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query('SELECT * FROM users WHERE username = $1', [username], (err, result) => {
    if (err) {
        return res.status(404).json({ message: "No users found"});
    }
    });
    
  
    return res.status(200).json({ message: "Logged in"});
});

app.post("/api/receipts", (req, res) => {
    db.query('INSERT INTO receipts(amount, currency, datetime, location) VALUES($1, $2, $3, $4)', [req.body.amount, req.body.currency, req.body.datetime, req.body.location], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to insert data into database' });
        }
    res.status(201).json({ message: 'Receipt created successfully' });
});
});

app.get("/api/receipts", (req, res) => {                        // Gets all Receipts returns whole table
db.query('SELECT * FROM receipts', (err, result) => {
    if (err) {
        return res.status(500).json({ error: 'Failed to fetch data from database' });
    }
    return res.status(200).json(result.rows);
});
});

app.get("/api/receipts/:id", (req, res) => {                  // Gets Receipt by id
    const recipientid = req.params.id;
    db.query('SELECT * FROM receipts WHERE recipientid = $1', [recipientid], (err, result) => {
    if (err) {
        return res.status(500).json({ error: 'Failed to fetch data from database' });
    }
    return res.status(200).json(result.rows);
});
});

app.get("/api/donors/:id", (req, res) => {                  // Gets Donor by id
    const donorid = req.params.id;
    db.query('SELECT * FROM receipts WHERE donorid = $1', [donorid], (err, result) => {
    if (err) {
        return res.status(500).json({ error: 'Failed to fetch data from database' });
    }
    return res.status(200).json(result.rows);
});
});

app.get("/api/countries", (req, res) => {                                         // Gets a List of all countries that appear
    db.query('SELECT DISTINCT location FROM receipts', (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch data from database' });
        }
        return res.status(200).json(result.rows.map(row => row.location));
});
});

app.put("/api/donation", (req, res) => {                    // Hash receipt
    const receipt = req.body;

    const jsonEncrypt = {
        donorid: receipt.donorid,
        recipientid: receipt.recipientid,
        amount: receipt.amount,
        currency: receipt.currency,
        datatime: receipt.datatime,
        location: receipt.location
    }

    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    const encryptedData = cipher.update(JSON.stringify(jsonEncrypt), 'utf8', 'hex') + cipher.final('hex');

    const hash = crypto.createHash('sha256').update(encryptedData).digest('hex');
    
    return res.status(200).json({ hash });
});

app.listen(PORT, () => console.log(`server started on http://localhost:${PORT}`));