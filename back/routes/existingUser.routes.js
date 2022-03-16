module.exports = (app) => {
  const users = require("../controllers/existingUser.controller.js");

  var router = require("express").Router();

  // Retrieve all users
  router.get("/", users.findAll);

  // Retrieve all published users
  router.get("/approved", users.findAllApproved);

  // Retrieve a single user with id
  router.get("/:id", users.findOne);

  // Update a user with id
  router.put("/:id", users.update);

  // Delete a user with id
  router.delete("/:id", users.delete);

  router.delete("/", users.deleteAll);

  app.use("/api/users", router);
};
