var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var multer = require('multer'); 
var upload = multer(); 

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'driverdb';
const client = new MongoClient(url);

// GET at the root just to demonstrate
router.get('/', function(req, res, next) {
   res.send('got a GET request at /');
});
 
// GET list of drivers to show that we're up and running
router.get('/drivers', function(req, res, next) {
    //Getting list of bills from database
    client.connect(function(err) { 
        const db = client.db(dbName);
        const collection = db.collection('drivers');
        collection.find({}).toArray(function(err, data) {
            if (err != null) {
                console.log(err);
                return res.status(500).send({ 
                    message: err.message || "Some error occurred while retrieving drivers." });
            }
            return res.send(data);
        });
    });
});
 
// accept POST request and add a new toll to the db
router.post('/drivers', upload.array(), function (req, res) {
     //Extracting data and saving in the database.
    let nu = { no: req.body.no, 
        name: req.body.name,
        email: req.body.email };

    client.connect(function(err) {
        const db = client.db(dbName);
        const collection = db.collection('drivers');
        collection.insertOne(nu, function(err, result) {
            if(err != null) { 
                console.log(err);
                return res.status(500).send({
                    message:
                    err.message || "Some error occurred while creating the drivers."});
            }
            return res.send(result);
        });
    });
});
 
// accept PUT request at /driver
router.put('/drivers', function (req, res) {
 res.send('Got a PUT request at /driver');
});
 
 
// accept DELETE request at /driver
router.delete('/drivers', function (req, res) {
 res.send('Got a DELETE request at /driver');
});
 
module.exports = router;