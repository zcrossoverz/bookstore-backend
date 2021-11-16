const cart = require("../controllers/cart.controller");
const express = require("express");
const middlewares = require("../middlewares");

module.exports = (app) => {
    let router = express.Router();

    router.post("/", cart.add);
    router.delete("/:id", cart.delete);
    router.delete("/", cart.deleteAll);
    router.patch("/increase/:id", cart.increase);
    router.get("/degree/:id", cart.decrease);
    router.use(middlewares.verifyToken);
    router.get("/checkout", cart.checkout);
    
    app.use("/api/cart", router);
};