const { BadRequestError } = require("../helpers/error");
const db = require("../models");
const User = db.User;

const checkIsAdmin = async (req, res, next) => {

            const [error, user_request] = await User.findOne({
                _id: req.body.id,
            }).exec();
            if(error) {
                return next(new BadRequestError(500, "Error: "+error));
            }
            if(user_request){
                console.log(user_request);
            }else{
                console.log("errorrrr");
            }
            if (!user_request.isAdmin) {
                return next(new BadRequestError(403, "You cannot delete users"));
            }
    
            return next();
};

module.exports = {
    checkIsAdmin,
};