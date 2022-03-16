const db = require("../models");
const Toll = db.tolls;

//Welcome page
exports.start = (response) => {
    response.writeHead(200, {"Content-type": "text/plain"});
    response.write("Welcome to the petshop system");
    response.end();
};

// Create and Save a new Toll
exports.create = (req, res) => {
     // Validate request
    if (!req.body.no) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
  
    // Create a toll model object
    const toll = new Toll({
        no: req.body.no,
        name: req.body.name,  
    });
    // Save Toll in the database
    toll
        .save(toll)
        .then(data => {
            console.log("Toll saved in the database: " + data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send( {
                message:
                  err.message || "Some error occurred while creating the Toll."
            });
        });
};
 
// Retrieve all Tolls from the database.
exports.findAll = (req, res) => {
    const no = req.query.no;
    //We use req.query.no to get query string from the Request and consider it as condition for findAll() method.
    var condition = no ? { no: { $regex: new RegExp(no), $options: "i" } } : {};
    Toll
        .find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send( {
                message: 
                    err.message || "Some error occurred while retrieving Tolls."
            });
        });
};

//Find a single Toll with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Toll.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not fond toll by id!" + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving toll with id!" + id });

        });
};
 
// Update a Toll by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(404).send({
            message: "Data to update can not be empty!"
        });
    } 

    const id = req.params.id;

    Toll.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Toll with id=${id}.Maybe Toll was not found`
                });
            } else res.send({ message: "Toll was updated successfully. " });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Toll with id=" + id
            });
        });  
};
 
// Delete a Toll with the specified id in the request
exports.delete = (req, res) => {
    
    const id = req.params.id;

    Toll.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Toll with id=${id}.Maybe Toll was not found`
                });
            } else {
                res.send({
                  message: "Toll was updated successfully. "
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Toll with id=" + id
            });
       });        
};
 
 
// Delete all Tolls from the database.
exports.deleteAll = (req, res) => {

    Toll.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Toll were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Tolls."
            });
        });
};

// Find all published Tolls
exports.findAllPublished = (req, res) => {
    Toll.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Tolls."
            });
        });
}