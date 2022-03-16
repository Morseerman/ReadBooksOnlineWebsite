var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var multer = require('multer'); 
var upload = multer(); 

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'cardb';
const client = new MongoClient(url);

// GET at the root just to demonstrate
router.get('/', function(req, res, next) {
   res.send('got a GET request at /');
});
 
// GET list of cars to show that we're up and running
router.get('/cars', function(req, res, next) {
    //Getting list of cars from database
    client.connect(function(err) { 
        const db = client.db(dbName);
        const collection = db.collection('cars');
        collection.find({}).toArray(function(err, data) {
            if (err != null) {
                console.log(err);
                return res.status(500).send({ 
                    message: err.message || "Some error occurred while retrieving cars." });
            }
            return res.send(data);
        });
    });
});
 
// accept POST request and add a new cars to the db
router.post('/cars', upload.array(), function (req, res) {
     //Extracting data and saving in the database.
    let nu = { no: req.body.no, 
        ownername: req.body.ownername,
        country: req.body.country };

    client.connect(function(err) {
        const db = client.db(dbName);
        const collection = db.collection('cars');
        collection.insertOne(nu, function(err, result) {
            if(err != null) { 
                console.log(err);
                return res.status(500).send({
                    message:
                    err.message || "Some error occurred while creating the cars."});
            }
            return res.send(result);
        });
    });
});
 
// accept PUT request at /car
router.put('/cars', function (req, res) {
 res.send('Got a PUT request at /car');
});
 
 
// accept DELETE request at /car
router.delete('/cars', function (req, res) {
 res.send('Got a DELETE request at /car');
});
 
module.exports = router;