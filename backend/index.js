const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const { Client } = require('pg');
const { mplTokenMetadata, fetchDigitalAsset, fetchAllDigitalAsset, verifyCollectionV1, fetchAllDigitalAssetByOwner, findMetadataPda, printSupply } = require('@metaplex-foundation/mpl-token-metadata');
const { encode, decode } = require("uint8-base64");
const { generateSigner, signerIdentity, percentAmount, publicKey, createSignerFromKeypair, createGenericFile, sol, dateTime } = require('@metaplex-foundation/umi');
const { createUmi } = require('@metaplex-foundation/umi-bundle-defaults');
const { irysUploader } = require('@metaplex-foundation/umi-uploader-irys');
const { base58 } = require('@metaplex-foundation/umi/serializers');
const { fs } = require('fs');
const path = require('path');
const { mint, nftMetadata, generateSignature } = require("./mint");
const { getCountryFees } = require("./mercuryo");
require('dotenv').config({ path: '.env' });
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
            return res.status(404).json({ message: "No users found" });
        }
    });
    return res.status(200).json({ user: { username, wallet: "JFKLDSJFL", token: "dkslfjlkjdfsl" } });
});

app.get("/api/receipts", (req, res) => {                        // Gets all Receipts returns whole table
    db.query('SELECT receipts.*, donatees.name as donatee FROM receipts JOIN donatees ON donatee_id=donatees.id', (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch data from database' });
        }
        return res.status(200).json(result.rows);
    });
});

app.get("/api/receipts/:id", (req, res) => {                  // Gets Receipt by id
    const id = req.params.id;
    db.query("SELECT receipts.*, donatees.name as donatee FROM receipts JOIN donatees ON donatee_id=donatees.id WHERE receipts.id=$1", [id],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Failed to fetch data from database' });
            }
            if (result.rows.length < 1) {
                return res.status(400).json({ error: `The Receipt with id: ${id} is not found. ` });
            }
            const receipt = result.rows[0];
            return res.status(200).json(receipt);
        });
});

app.get("/api/countryFees", async (req, res) => {                        // Gets all CountryFees from Mercuryo
        const countryFees = await getCountryFees(process.env.WIDGET_ID);
        return res.status(200).json(countryFees);
});

app.get("/api/countries", (req, res) => {                                         // Gets a List of all countries that appear
    db.query('SELECT DISTINCT location FROM receipts', (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch data from database' });
        }
        return res.status(200).json(result.rows.map(row => row.location));
    });
});

app.get("/api/charities", (req, res) => {                                                               // Return the Charity Table data
    db.query('SELECT * FROM charity', (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch data from database' });
        }
        return res.status(200).json(result.rows);
    });
});

app.get("/api/charity/:id", (req, res) => {
    /*
    const id = req.params.id;
    
    db.query('SELECT * FROM charity where id = $1', [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to fetch data from database' });
        }
        result.rows[0].donatees = JSON.parse(result.rows[0].donatees);
        console.log(result.rows);
        return res.status(200).json(result.rows);
    });
    */
    animals = [
        { id: 1, name: "Vjosa", age: 3, sex: "Female", injections: true, neutered: true, personality: "Open-minded, relaxed, Likes to live alone without other cats. " },
        { id: 2, name: "Esmer", age: 7, sex: "Female", injections: true, neutered: true, personality: "Sweet, social, cat-friendly, cuddly, knows what she wants. " },
        { id: 3, name: "Emilia", age: 1, sex: "Female", injections: true, neutered: false, personality: "Playful and cuddly, loves human attention, likes to talk. " },
        { id: 4, name: "Batman", age: 2, sex: "Male", injections: true, neutered: true, personality: "Loves cuddles, cat sociable and likes various kinds of food. " }
    ];
    sample_data =
    {
        "name": "streunerhilfe-bulgarien",
        "country": "Germany",
        "city": "Berlin",
        "slogan": "Support to Help Aiding Stray Animals",
        "detail": "Provides vital support for stray animals in Bulgaria, offering rescue, medical care, and shelter for abandoned dogs and cats.",
        "donatees": animals,
        "id": 1,
        "taxid": "a2DddfU943E3"
    };
    return res.status(200).json(sample_data);
});

app.get("/api/donatee:id/imgA", (req, res) => {
    return res.status(200).json("imgA");
});

app.get("/api/donatee:id/imgB", (req, res) => {
    return res.status(200).json("imgB");
});

// Donatee Table
app.get("/api/donatees/:id", (req, res) => {                  // Gets Donor by id
    const id = req.params.id;
    db.query('SELECT * FROM donatees WHERE id=$1', [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Failed to fetch data from database' });
        }
        if (result.rows.length<1){
            return res.status(400).json({error: `Donatee with ${id} is not found. `});
        }
        return res.status(200).json(result.rows[0]);
    });
});

app.get("/nft/:id.json", (req, res) => {
    // id is receipt ID
    const id = req.params.id;
    db.query("SELECT receipts.*, donatees.name as donatee FROM receipts JOIN donatees ON donatee_id=donatees.id WHERE receipts.id=$1", [id],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Failed to fetch data from database' });
            }
            if (result.rows.length < 1) {
                return res.status(400).json({ error: `The Receipt with id: ${id} is not found. ` });
            }
            const receipt = result.rows[0];
            const metadata = nftMetadata(receipt.donatee_id, receipt.donatee, receipt.amount, receipt.username, receipt.date);
            return res.status(200).json(metadata);
        });

    // Replace with content in Database
    // donateeName = "DOGGO"; amount = "100"; donorName = "John"; donationDate = new Date(); donateeId = 1;
    //res.status(200).json(nftMetadata(donateeId, donateeName, amount, donorName, donationDate));
});

app.put("/api/donate", async (req, res) => {     // Hash receipt
    const receipt = req.body;
    console.log(receipt);
    const dataneeded = ["username", "amount", "donateeId"];
    const datamissing = dataneeded.filter(field => !receipt[field]);

    if (datamissing.length > 0) {
        return res.status(400).json({ error: `Missing donation receipt data: ${datamissing.join(", ")}` });         // Tells you the what is missing for the put
    }

    const mintSigner = generateSignature();
    const receiptData = {
        username: receipt.username,
        amount: receipt.amount,
        date: JSON.stringify(new Date()),
        donatee_id: receipt.donateeId,
        signature: mintSigner.publicKey,
    }


    // TODO: ADD Database Logic to Store RECEIPT
    await db.query("INSERT INTO receipts(amount, username, date, donatee_id, signature) VALUES ($1, $2, $3, $4, $5) RETURNING *; ",
        [receiptData.amount, receiptData.username, receiptData.date, receiptData.donatee_id, receiptData.signature],
        async (err, result) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ error: "error when storing receipts" });
            }
            receiptId = result.rows[0].id;
            // Change mint(1) to mint(receiptId)
            const signature = await mint(receiptId, mintSigner);
            return res.status(200).json(result.rows[0]);
        }
    );
});


app.listen(PORT, () => console.log(`server started on port: ${PORT}`));
