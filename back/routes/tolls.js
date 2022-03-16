var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var multer = require('multer'); 
var upload = multer(); 

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'tollsdb';
const client = new MongoClient(url);

// GET at the root just to demonstrate
router.get('/', function(req, res, next) {
   res.send('got a GET request at /');
});
 
// GET list of tolls to show that we're up and running
router.get('/tolls', function(req, res, next) {
    //Getting list of bills from database
    client.connect(function(err) { 
        const db = client.db(dbName);
        const collection = db.collection('tolls');
        collection.find({}).toArray(function(err, data) {
            if (err != null) {
                console.log(err);
                return res.status(500).send({ 
                    message: err.message || "Some error occurred while retrieving tolls." });
            }
            return res.send(data);
        });
    });
});
 
// accept POST request and add a new toll to the db
router.post('/bills', upload.array(), function (req, res) {
     //Extracting data and saving in the database.
    let nu = { no: req.body.no, 
               name: req.body.name,};

    client.connect(function(err) {
        const db = client.db(dbName);
        const collection = db.collection('tolls');
        collection.insertOne(nu, function(err, result) {
            if(err != null) { 
                console.log(err);
                return res.status(500).send({
                    message:
                    err.message || "Some error occurred while creating the tolls."});
            }
            return res.send(result);
        });
    });
});
 
// accept PUT request at /toll
router.put('/tolls', function (req, res) {
 res.send('Got a PUT request at /bill');
});
 
 
// accept DELETE request at /toll
router.delete('/tolls', function (req, res) {
 res.send('Got a DELETE request at /bill');
});
 
module.exports = router;