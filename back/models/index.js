const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;


db.bookRequests = require("./bookRequest.model");
db.user = require("./user.model");
db.role = require("./role.model");
db.ROLES = ["user", "admin", "employee"];

module.exports = db;
