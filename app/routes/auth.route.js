const auth = require("../controllers/auth.controller");
const express = require("express");

module.exports = (app) => {
    let router = express.Router();

    router.post("/login", auth.login);
    router.post("/register", auth.register);

    app.use("/api", router);
};