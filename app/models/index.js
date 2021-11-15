const mongoose = require("mongoose");
const createUserModel = require("./user.model");

const db = {};

db.mongoose = mongoose;
db.User = createUserModel(mongoose);

module.exports = db;