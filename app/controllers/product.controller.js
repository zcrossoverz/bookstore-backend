const handle = require("../helpers/promise");
const { BadRequestError } = require("../helpers/error");
const { Product } = require("../models");

exports.addProduct = async (req, res, next) => {
    const product = new Product({
        title: req.body.title,
        cover: req.body.cover,
        author: req.body.author,
        price: req.body.price,
        desc: req.body.desc,
        number: req.body.number
    });
    const [error] = await handle(product.save());
    
    if(error){
        let statusCode = 400;
        let { username = {}, email = {}, password = {} } = error.errors;
        const errorMessage = username.message || email.message || password.message;
        if(!errorMessage){
            statusCode = 500;
        }
        return next(new BadRequestError(statusCode, errorMessage));
    }
   res.send({ message:"add product successfully" });
};

exports.getAllProduct = async (req, res, next) => {
   
    const [error, data] = await handle(Product.find({}));
    if(error){
        return next(new BadRequestError(500, 'An error occured while retrieving info'));
    }

    return res.send(data);
};

exports.getProduct = async (req, res, next) => {
    const condition = {
        _id: req.params.id
    };
    const [error, data] = await handle(Product.findOne(condition));
    if(error){
        return next(new BadRequestError(500, 'An error occured while retrieving info'));
    }

    return res.send(data);
};

exports.setProductHot = async (req, res, next) => {
    const condition = {
        _id: req.params.id
    };
    const [error, data] = await handle(Product.findOneAndUpdate(condition, {hot:true}, {
        new: true
    }));
    if(error){
        return next(new BadRequestError(500, 'An error occured while retrieving info'));
    }

    return res.send(data);
};

exports.unSetProductHot = async (req, res, next) => {
    const condition = {
        _id: req.params.id
    };
    const [error, data] = await handle(Product.findOneAndUpdate(condition, {hot:false}, {
        new: true
    }));
    if(error){
        return next(new BadRequestError(500, 'An error occured while retrieving info'));
    }

    return res.send(data);
};

exports.deleteProduct = async (req, res, next) => {
    const condition = {
        _id: req.params.id
    };
    const [error, data] = await handle(Product.findOneAndDelete(condition));
    if(error){
        return next(new BadRequestError(500, 'Error '+error));
    }
    if(!data){
        return next(new BadRequestError(404, `Not found product with id=${req.params.id}`));
    }
    return res.send({ message: 'Product was deleted successfully'});
};

exports.deleteAllProduct = async (req, res, next) => {

    const [error, data] = await handle(Product.deleteMany({}));
    if(error){
        return next(new BadRequestError(500, 'Error '+error));
    }
    return res.send({
        message: `${data.deletedCount} products were deleted successfully`
    });
};