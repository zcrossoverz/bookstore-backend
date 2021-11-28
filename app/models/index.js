const mongoose = require("mongoose");
const createUserModel = require("./user.model");
const createOrderModel = require("./order.model");
const createProductModel = require("./product.model");
const db = {};

db.mongoose = mongoose;
db.User = createUserModel(mongoose);
db.Order = createOrderModel(mongoose);
db.Product = createProductModel(mongoose);

module.exports = db;