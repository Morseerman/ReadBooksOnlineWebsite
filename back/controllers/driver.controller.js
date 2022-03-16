const db = require("../models");
const Driver = db.drivers;

//Welcome page
exports.start = (response) => {
    response.writeHead(200, {"Content-type": "text/plain"});
    response.write("Welcome to the petshop system");
    response.end();
};

// Create and Save a new driver
exports.create = (req, res) => {
     // Validate request
    if (!req.body.no) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
  
    // Create a driver model object
    const driver = new Driver({
        no: req.body.no,
        name: req.body.name, 
        email: req.body.email,
    });
    // Save driver in the database
    driver
        .save(driver)
        .then(data => {
            console.log("Driver saved in the database: " + data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send( {
                message:
                  err.message || "Some error occurred while creating the driver."
            });
        });
};
 
// Retrieve all drivers from the database.
exports.findAll = (req, res) => {
    const no = req.query.no;
    //We use req.query.no to get query string from the Request and consider it as condition for findAll() method.
    var condition = no ? { no: { $regex: new RegExp(no), $options: "i" } } : {};
    Driver
        .find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send( {
                message: 
                    err.message || "Some error occurred while retrieving Drivers."
            });
        });
};

//Find a single Driver with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Driver.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not fond driver by id!" + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving driver with id!" + id });

        });
};
 
// Update a driver by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(404).send({
            message: "Data to update can not be empty!"
        });
    } 

    const id = req.params.id;

    Driver.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Driver with id=${id}.Maybe Driver was not found`
                });
            } else res.send({ message: "Driver was updated successfully. " });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Driver with id=" + id
            });
        });  
};
 
// Delete a Driver with the specified id in the request
exports.delete = (req, res) => {
    
    const id = req.params.id;

    Driver.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Driver with id=${id}.Maybe Driver was not found`
                });
            } else {
                res.send({
                  message: "Driver was updated successfully. "
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Driver with id=" + id
            });
       });        
};
 
 
// Delete all Driver from the database.
exports.deleteAll = (req, res) => {

    Driver.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Driver were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Drivers."
            });
        });
};

// Find all published Driver
exports.findAllPublished = (req, res) => {
    Driver.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Driver."
            });
        });
}