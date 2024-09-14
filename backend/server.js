// const express = require('express')
// const dotenv = require('dotenv')
// const { MongoClient } = require('mongodb');
// const bodyparser = require('body-parser')

// dotenv.config()

// // Connection URL
// const uri = 'mongodb://127.0.0.1:27017/';
// const client = new MongoClient(uri);

// // Database Name
// const dbName = 'passop';
// const app = express()
// const port = 3000
// app.use(bodyparser.json())

//  client.connect();
// //  console.log('Connected successfully to server');
 

//  //Get all the passwords
//  app.get('/',  async (req, res) => {
//     const db = client.db(dbName);
//     const collection = db.collection('passwords');
//     const findResult = await collection.find({}).toArray();
//   res.json(findResult)

// })

// // Save a password

// app.post('/db',  async (req, res) => {
//     const password = req.body
//     const db = client.db(dbName);
//     const collection = db.collection('passwords');
//     const findResult = await collection.insertOne(password);
//    res.send({success: true})

// })

// // Delete a password

// app.listen(port, () => {
//   console.log(`Example app listening on port http://localhost:${port}`)
// })


const express = require('express');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require ('cors')

dotenv.config();

// Connection URL
const uri = 'mongodb://127.0.0.1:27017/';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Database Name
const dbName = 'passop';
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors())

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected successfully to MongoDB server');
        
        // Define your routes here after connecting
        app.listen(port, () => {
            console.log(`Example app listening on http://localhost:${port}`);
        });
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);zz
    }
}

connectToMongoDB();

// Get all the passwords
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
});

// Save a password
app.post('/db', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({ success: true,data:password, result:findResult});
});

// Delete a password by id
app.delete('/db', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({ success: true,data:password, result:findResult});
});
