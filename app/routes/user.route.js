const user = require("../controllers/user.controller");
const express = require("express");
const middlewares = require("../middlewares");

module.exports = (app) => {
    let router = express.Router();

    router.get("/all",user.findAll);
    router.use(middlewares.verifyToken);
    router.post("/info", user.getInfo);
    router.post("/:id",user.updateInfo);
    router.delete("/:id", user.getInfo);

    app.use("/api/user", router);
};