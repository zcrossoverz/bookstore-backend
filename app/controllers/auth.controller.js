const bcryptjs = require("bcryptjs");
const handle = require("../helpers/promise");
const { BadRequestError } = require("../helpers/error");
const { User } = require("../models");

exports.register = async (req, res, next) => {
    // res.send(req.body);
    const user = new User({
        username: req.body.username,
        password: bcryptjs.hashSync(req.body.password,8),
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone
    });


    const [error] = await handle(user.save());
    if(error){
        let statusCode = 400;
        let { username = {}, email = {}, password = {} } = error.errors;
        const errorMessage = username.message || email.message || password.message;
        if(!errorMessage){
            statusCode = 500;
        }
        return next(new BadRequestError(statusCode, errorMessage));
    }
   res.send({ message:"user was successfully registered" });
};

exports.login = async (req, res, next) => {
    const [error, user] = await handle(
        User.findOne({
            username: req.body.username
        }).exec()
    );

    if (error) {
        console.log(error);
        return next(new BadRequestError(500));
    }

    if (!user) {
        return next(new BadRequestError(401, "Username not exist!"));
    }

    const passwordIsValid = bcryptjs.compareSync(
        req.body.password,
        user.password
    );

    if (!passwordIsValid) {
        return next(new BadRequestError(401, "Wrong password"));
    }

    res.send({ message: "dang nhap thanh cong" });
};