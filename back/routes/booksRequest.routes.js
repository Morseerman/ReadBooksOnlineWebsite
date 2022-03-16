module.exports = (app) => {
    const bookRequests = require("../controllers/bookRequest.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", bookRequests.create);
  
    // Retrieve all Tutorials
    router.get("/", bookRequests.findAll);
  
    router.get("/test/:user", bookRequests.findAllByUser);
  
    // Retrieve all published Tutorials
    router.get("/published", bookRequests.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", bookRequests.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", bookRequests.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", bookRequests.delete);
  
    // Create a new Tutorial
    router.delete("/", bookRequests.deleteAll);
  
    app.use("/api/bookRequests", router);
  };
  