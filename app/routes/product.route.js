const product = require("../controllers/product.controller");
const express = require("express");
const middlewares = require("../middlewares");

module.exports = (app) => {
    let router = express.Router();

    router.get("/", product.getAllProduct);
    router.get("/:id", product.getProduct);
    router.put("/hot/:id", product.setProductHot);
    router.put("/unset_hot/:id", product.unSetProductHot);
    router.use(middlewares.verifyToken);
    router.post("/add", product.addProduct);
    router.delete("/:id", product.deleteProduct);
    router.delete("/", product.deleteAllProduct);
    
    app.use("/api/product", router);
};