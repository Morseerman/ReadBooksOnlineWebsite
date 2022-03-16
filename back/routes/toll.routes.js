module.exports = (app) => {
  const tolls = require("../controllers/toll.controller");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", tolls.create);

  // Retrieve all Tutorials
  router.get("/", tolls.findAll);

  // Retrieve all published Tutorials
  router.get("/published", tolls.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", tolls.findOne);

  // Update a Tutorial with id
  router.put("/:id", tolls.update);

  // Delete a Tutorial with id
  router.delete("/:id", tolls.delete);

  // Create a new Tutorial
  router.delete("/", tolls.deleteAll);

  app.use("/api/tolls", router);
};
