module.exports = (app) => {
  const bills = require("../controllers/bill.controller");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", bills.create);

  // Retrieve all Tutorials
  router.get("/", bills.findAll);

  router.get("/test/:user", bills.findAllByUser);

  // Retrieve all published Tutorials
  router.get("/published", bills.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", bills.findOne);

  // Update a Tutorial with id
  router.put("/:id", bills.update);

  // Delete a Tutorial with id
  router.delete("/:id", bills.delete);

  // Create a new Tutorial
  router.delete("/", bills.deleteAll);

  app.use("/api/bills", router);
};
