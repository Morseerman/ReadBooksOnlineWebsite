const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.bills = require("./bill.model");
db.bookRequests = require("./bookRequest.model");
db.tolls = require("./toll.model.js");
db.drivers = require("./driver.model.js");
db.cars = require("./car.model.js");
db.user = require("./user.model");
db.role = require("./role.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
