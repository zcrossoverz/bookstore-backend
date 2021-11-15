const express = require("express");
const cors = require("cors");
const config = require("./app/config");
const setUpAuthRoutes = require("./app/routes/auth.route");

const app = express();

// setup cors
app.use(cors({ origin:config.app.origins }));

// parse request of json 
app.use(express.json());

// parse request of x-www-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
    res.send({ message: "Hello world" });
});

setUpAuthRoutes(app);

const PORT = config.app.port;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}!`);
});