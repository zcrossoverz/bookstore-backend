const { User, Order } = require("../models");
const handle = require("../helpers/promise");
const { BadRequestError } = require("../helpers/error");

exports.add = async (req, res, next) => {

}

exports.delete = async (req, res, next) => {
    
}

exports.deleteAll = async (req, res, next) => {
    
}

exports.increase = async (req, res, next) => {
    
}

exports.decrease = async (req, res, next) => {
    res.send({ message: "checkout" });
}

exports.checkout = async (req, res, next) => {
    const [error, order] = await handle(
        Order.findOne({
            username: req.body.username
        }).exec()
    );
    if (error) {
        console.log(error);
        return next(new BadRequestError(500));
    }
    if (!order) {
        return next(new BadRequestError(401, "Username not exist!"));
    }

    order.order.push(
        {
            id: req.body.id,
            name: req.body.name,
            time_order: Date.now(),
            number: req.body.number,
            price: req.body.price,
            total: req.body.total
        }
    );
    const [err] = await handle(order.save());

    if(err){
        return next(new BadRequestError(500, "Error when update order: "+err));
    }

    res.send({ message:"update successfully" });
}

exports.getAllOrder = async (req, res, next) => {
    const [error, order] = await handle(
        Order.findOne({
            username: req.body.username
        }).exec()
    );
    if (error) {
        console.log(error);
        return next(new BadRequestError(500, "Error when get all order: "+error));
    }
    if (!order) {
        return next(new BadRequestError(401, "Username not exist!"));
    }


    res.send(order);
}