const db = require("../models");
const BookRequest = db.bookRequests;

// Create and Save a new bookRequest
exports.create = (req, res) => {
  // Validate request
//   if (!req.body.no) {
//     res.status(400).send({ message: "Content can not be empty!" });
//     return;
//   }
 
  // Create a bookRequest
  const bookRequest = new BookRequest({
    title: req.body.title,
    author: req.body.author,
    date: req.body.date,
    amount: req.body.amount,
    isPaid: req.body.isPaid,
    user: req.body.user,
  });

  // Save bookRequest in the database
  bookRequest
    .save(bookRequest)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the bookRequest.",
      });
    });
};

// Retrieve all bookRequests from the database.
exports.findAll = (req, res) => {
  const no = req.query.no;
  var condition = no ? { no: { $regex: new RegExp(no), $options: "i" } } : {};

  BookRequest.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving bookRequests.",
      });
    });
};

//retrieve all bookRequests from user
exports.findAllByUser = (req, res) => {
  const user = req.params.user;
  console.log(user);
  BookRequest.find({ user: user })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "Error when finding users bookRequests" });
    });
};

// Find a single bookRequest with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  BookRequest.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found bookRequest with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving bookRequest with id=" + id });
    });
};

// Update a bookRequest by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  BookRequest.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update bookRequest with id=${id}. Maybe bookRequest was not found!`,
        });
      } else res.send({ message: "bookRequest was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating bookRequest with id=" + id,
      });
    });
};

// Delete a bookRequest with the specified id in the request
exports.delete = (req, res, next) => {
  const title = req.params.id;
   
  console.log(BookRequest.find({}))
  BookRequest.find({title: title})
    .then((data) => {
      if (!data) {
        console.log("bye")
        res.status(404).send({
          message: `Cannot delete bookRequest with id=${title}. Maybe bookRequest was not found!`,
        });
      } else {
       
        BookRequest.deleteOne({title: title}).then(e => e)
        res.send({
          message: "bookRequest was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete bookRequest with id=" + id,
      });
    });
};

// Delete all bookRequests from the database.
exports.deleteAll = (req, res) => {
  BookRequest.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} bookRequests were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all bookRequests.",
      });
    });
};

// Find all published bookRequests
exports.findAllPublished = (req, res) => {
  BookRequest.find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving bookRequests.",
      });
    });
};
