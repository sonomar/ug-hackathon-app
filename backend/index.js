const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const { Client } = require('pg');
const {  mplTokenMetadata, fetchDigitalAsset, fetchAllDigitalAsset, verifyCollectionV1, fetchAllDigitalAssetByOwner, findMetadataPda, printSupply} = require('@metaplex-foundation/mpl-token-metadata');
const {encode, decode} = require("uint8-base64");
const { generateSigner, signerIdentity, percentAmount, publicKey, createSignerFromKeypair, createGenericFile, sol } = require('@metaplex-foundation/umi');
const { createUmi } = require('@metaplex-foundation/umi-bundle-defaults');
const { irysUploader } = require('@metaplex-foundation/umi-uploader-irys');
const { base58 } = require('@metaplex-foundation/umi/serializers');
const { fs } = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env'});
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
const db = new Client({
   connectionString: process.env.EXTERNAL_URL // External URL
  });
db.connect()
    .then(() => {
    console.log('Connected to database');                   // If the database is connected or not
})
    .catch((err) => {
    console.error('Error connecting to database', err);
});
    // User Table
app.post("/api/login", (req, res) => {                      // User trys to login
    const username = req.body.username;
    const password = req.body.password;
    db.query('SELECT * FROM users WHERE username = $1', [username], (err, result) => {
    if (err) {
        return res.status(404).json({ message: "No users found"});
    }
    });
    return res.status(200).json({ user: {username, wallet: "JFKLDSJFL", token: "dkslfjlkjdfsl"}});
});
    // Receipts Table
app.post("/api/receipts", (req, res) => {
    db.query('INSERT INTO receipts(amount, datetime, username) VALUES($1, $2, $3)', [req.body.amount, req.body.datetime, req.body.username], (err, result) => {     // Posts a receipt
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
app.get("/api/countries", (req, res) => {                                         // Gets a List of all countries that appear
    db.query('SELECT DISTINCT location FROM receipts', (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch data from database' });
        }
        return res.status(200).json(result.rows.map(row => row.location));
});
});
    // Receipt Items Table
app.get("/api/receiptitems/:id", (req, res) => {
    const itemid = req.params.id;
    db.query('SELECT * FROM receiptitems WHERE itemid = $1', [itemid], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch data from database' });
        }
        return res.status(200).json(result.rows);
    });
});
    // Charity Table
    // Donatee Table
    app.get("/api/donors/:id", (req, res) => {                  // Gets Donor by id
        const charityid = req.params.id;
        db.query('SELECT * FROM donatees WHERE charityid = $1', [charityid], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch data from database' });
        }
        return res.status(200).json(result.rows);
    });
    });
    // Hashing
app.put("/api/donation", async (req, res) => {     // Hash receipt
const PUBKey = process.env.PUBLIC_KEY;
    const receipt = req.body;
    const mint = generateSigner(umi);
    const dataneeded = ["donorid", "amount", "datetime"];
    const datamissing = dataneeded.filter(field => !receipt[field]);
    if (datamissing.length > 0)
    {
    return res.status(400).json({message: `Missing donation receipt data: ${datamissing.join(", ")}`});         // Tells you the what is missing for the put
    }
    const jsonEncrypt = {
        donorid: receipt.donorid,
        amount: receipt.amount,
        datetime: receipt.datetime
    }
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    const encryptedData = cipher.update(JSON.stringify(jsonEncrypt), 'utf8', 'hex') + cipher.final('hex');
    const hash = crypto.createHash('sha256').update(encryptedData).digest('hex');
    const metadata = {
        name: "Donation Receipt",
        symbol: "DR",
        uri: `https://localhost:8080/metadata/${hash}`,
        sellerFeeBasisPoints: 0,
        image: "dog.png",
        properties: {
        files: [{
            type: "image/png",
            uri: "dog.png"
        }
        ],
        creators: [
            {
                address: "ENtDHtEM95aEc7UYmVVorGiAZSz2xgY8LsoDqKdd5wdJ",
                verified: true,
                share: 100
            }
        ]
    }
    };
   mintedNft = await createNft(umi, {
        authority: owner.publicKey,
        mint: owner.publicKey,
        name: "UG NFT",
        uri: `https://localhost:8080/metadata/${hash}`,
        sellerFeeBasisPoints: percentAmount(0.0),
        isCollection: false,
        printSupply: printSupply("Zero", [0]),
    }).sendAndConfirm(umi);
    const nftSignature = mintedNft.uri;
    db.query('INSERT INTO nft (donorid, amount, datetime, hash, nft_signature) VALUES ($1, $2, $3, $4, $5)', [receipt.donorid, receipt.amount, receipt.datetime, hash, nftSignature], (err, result) => {
        if (err){
            return res.status(500).json({ error: 'Failed to insert nft into database'});
        }
        res.status(200).json({message: 'NFT minted successfully', nftSignature});
    });
});
app.listen(PORT, () => console.log(`server started on port: ${PORT}`));   