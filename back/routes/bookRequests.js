const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const dbName = "billsdb";
const client = new MongoClient(url);

// GET at the root just to demonstrate
router.get("/", function (req, res, next) {
  res.send("got a GET request at /");
});

// GET list of bookRequests to show that we're up and running
router.get("/bookRequests", function (req, res, next) {
  //Getting list of bookRequests from database
  client.connect(function (err) {
    const db = client.db(dbName);
    const collection = db.collection("bookRequests");
    collection.find({}).toArray(function (err, data) {
      if (err != null) {
        console.log(err);
        return res.status(500).send({
          message: err.message || "Some error occurred while retrieving bookRequests.",
        });
      }
      return res.send(data);
    });
  });
});

// accept POST request and add a new bookRequest to the db
router.post("/bookRequests", upload.array(), function (req, res) {
  //Extracting data and saving in the database.
  let nu = {
    no: req.body.no,
    date: req.body.date,
    type: req.body.type,
    amount: req.body.amount,
  };

  client.connect(function (err) {
    const db = client.db(dbName);
    const collection = db.collection("bookRequests");
    collection.insertOne(nu, function (err, result) {
      if (err != null) {
        console.log(err);
        return res.status(500).send({
          message:
            err.message || "Some error occurred while creating the bookRequest.",
        });
      }
      return res.send(result);
    });
  });
});

// accept PUT request at /bookRequest
router.put("/bookRequests", function (req, res) {
  res.send("Got a PUT request at /bookRequest");
});

// accept DELETE request at /bookRequest
router.delete("/bookRequests", function (req, res) {
  res.send("Got a DELETE request at /bookRequest");
});

module.exports = router;
