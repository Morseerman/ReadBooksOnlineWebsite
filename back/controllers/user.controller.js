const User = require("./existingUser.controller")

exports.allAccess = (req, res) => { 
  res.status(200).send("Public Content.");  
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.employeeBoard = (req, res) => {
  res.status(200).send("Employee Content.");
};
