const mongoose = require("mongoose");
const createUserModel = require("./user.model");
const createOrderModel = require("./order.model");

const db = {};

db.mongoose = mongoose;
db.User = createUserModel(mongoose);
db.Order = createOrderModel(mongoose);

module.exports = db;