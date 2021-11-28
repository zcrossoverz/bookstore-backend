const { User } = require("../models");
const { BadRequestError } = require("../helpers/error");
const handle = require("../helpers/promise");
const bcryptjs = require("bcryptjs");


exports.getInfo = async (req, res, next) => {
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
    res.status(200).json(user);
}

exports.updateInfo = async (req, res, next) => {
    if(!req.body){
        return next(new BadRequestError(400, 'Data to update can not be empty'));
    }
    const condition = {
        _id: req.params.id
    };
    if(req.body.password) req.body.password = bcryptjs.hashSync(req.body.password,8);
    const [error, data] = await handle(User.findOneAndUpdate(condition, req.body, {
        new: true
    }));
    if(error){
        return next(new BadRequestError(500, `Error updating user with id=${req.params.id}: ${error}`));
    }
    if(!data){
        return next(new BadRequestError(404, 'Resource not found'));
    }
    return res.send({ 
        _id: data.id,
        username: data.username,
        password: data.password,
        email: data.email,
        address: data.address,
        phone: data.phone,
        isAdmin: data.isAdmin,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
     });
}

exports.findAll = async (req, res, next) => {
    let condition = {};
    const name = req.query.name;
    if(name){
        condition.name = { $regex: new RegExp(name), $options: 'i' };
        // options i == ko phan biet hoa thuong
    }
    const [error, data] = await handle(User.find(condition));
    if(error){
        return next(new BadRequestError(500, 'An error occured while retrieving info'));
    }

    return res.send(data);
};

// delete user
exports.delete = async (req, res, next) => {
    const condition = {
        _id: req.params.id
    };
    const [error, data] = await handle(Contact.findOneAndDelete(condition));
    if(error){
        return next(new BadRequestError(500, `Could not delete user with id=${req.params.id}`));
    }
    if(!data){
        return next(new BadRequestError(404, `Not found user with id=${req.params.id}`));
    }
    return res.send({ message: 'User was deleted successfully'});
};

// delete all user
exports.deleteAll = async (req, res, next) => {
    const [error, data] = await handle(User.deleteMany({}));
    if(error){
        return next(new BadRequestError(500, 'An error ocurred while removing all users'));
    }
    return res.send({
        message: `${data.deletedCount} users were deleted successfully`
    });
};