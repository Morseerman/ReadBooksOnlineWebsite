const db = require("../models");
const Car = db.cars;

//Welcome page
exports.start = (response) => {
    response.writeHead(200, {"Content-type": "text/plain"});
    response.write("Welcome to the petshop system");
    response.end();
};

// Create and Save a new car
exports.create = (req, res) => {
     // Validate request
    if (!req.body.no) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
  
    // Create a car model object
    const car = new Car({
        no: req.body.no,
        ownername: req.body.ownername, 
        country: req.body.country,
    });
    // Save car in the database
    car
        .save(car)
        .then(data => {
            console.log("car saved in the database: " + data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send( {
                message:
                  err.message || "Some error occurred while creating the car."
            });
        });
};
 
// Retrieve all drivers from the database.
exports.findAll = (req, res) => {
    const no = req.query.no;
    //We use req.query.no to get query string from the Request and consider it as condition for findAll() method.
    var condition = no ? { no: { $regex: new RegExp(no), $options: "i" } } : {};
    Car
        .find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send( {
                message: 
                    err.message || "Some error occurred while retrieving Cars."
            });
        });
};

//Find a single Car with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Car.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not fond car by id!" + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving car with id!" + id });

        });
};
 
// Update a car by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(404).send({
            message: "Data to update can not be empty!"
        });
    } 

    const id = req.params.id;

    Car.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Car with id=${id}.Maybe Car was not found`
                });
            } else res.send({ message: "Car was updated successfully. " });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Car with id=" + id
            });
        });  
};
 
// Delete a Car with the specified id in the request
exports.delete = (req, res) => {
    
    const id = req.params.id;

    Car.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Car with id=${id}.Maybe Car was not found`
                });
            } else {
                res.send({
                  message: "Car was updated successfully. "
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Car with id=" + id
            });
       });        
};
 
 
// Delete all Car from the database.
exports.deleteAll = (req, res) => {

    Car.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Car were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Car."
            });
        });
};

// Find all published Car
exports.findAllPublished = (req, res) => {
    Car.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Car."
            });
        });
}