const cart = require("../controllers/cart.controller");
const express = require("express");
const middlewares = require("../middlewares");

module.exports = (app) => {
    let router = express.Router();

    router.post("/", cart.add);
    router.use(middlewares.verifyToken);
    router.post("/checkout", cart.checkout);
    router.post("/get_order", cart.getAllOrder);
    
    app.use("/api/cart", router);
};