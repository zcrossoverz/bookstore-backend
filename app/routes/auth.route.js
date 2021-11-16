const auth = require("../controllers/auth.controller");
const express = require("express");
const middlewares = require("../middlewares");

module.exports = (app) => {
    let router = express.Router();

    router.post("/login", auth.login);
    router.post("/register", [middlewares.checkDuplicateUsernameOrEmail], auth.register);

    app.use("/api/auth", router);
};