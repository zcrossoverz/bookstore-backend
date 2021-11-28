const express = require("express");
const cors = require("cors");
const config = require("./app/config");
const { BadRequestError } = require("./app/helpers/error");

const setUpCartRoutes = require("./app/routes/cart.route");
const setUpAuthRoutes = require("./app/routes/auth.route");
const setUpUserRoutes = require("./app/routes/user.route");
const setUpProductRoutes = require("./app/routes/product.route");

const app = express();

// setup cors
app.use(cors({ origin:config.app.origins }));

// parse request of json 
app.use(express.json());

// parse request of x-www-urlencoded
app.use(express.urlencoded({ extended: true }));

// connect database
const db = require("./app/models");

db.mongoose.connect(config.db.url)
    .then(() => {
        console.log("Connected to the database!");
    }).catch(error => {
        console.log("Cannot connect to the database!", error);
        process.exit();
    })



app.get("/", (req, res, next) => {
    res.send({ message: "Hello world" });
});

setUpAuthRoutes(app);
setUpCartRoutes(app);
setUpUserRoutes(app);
setUpProductRoutes(app);

app.use((req, res, next) => {
    next(new BadRequestError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error"
    });
});


const PORT = config.app.port;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}!`);
});