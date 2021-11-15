const auth = require("../controllers/auth.controller");
const express = require("express");

module.exports = (app) => {
    let router = express.Router();

    router.get("/login", auth.login);
    router.get("/register", auth.register);

    app.use("/api/v1", router);
};