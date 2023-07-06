const Errorhandler = require("../utils/errorhandler");

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //Invalid mongodb Id error
    if(err.name == "CastError"){
        const message = `Resource not found.Invalid:${err.path}`;
        err =  new Errorhandler(message,400);
    }

    //Mongoose duplicate key error
    if(err.code == 11000){
        const message = `This ${Object.keys(err.keyValue)} already exists`;
        err = new Errorhandler(message,400);
    }

    //Wrong JWT error
    if(err.name === "JsonWebTokenError"){
        const message = `Json Web Token is invalid, please try again`;
        err = new ErrorHandler(meassge,400);
    }

    //JWT Expire
    if(err.name === "TokenExpiredError"){
        const message = `Json Web Token is expired, please try again after sometime`;
        err = new ErrorHandler(meassge,400);
    }


    res.status(err.statusCode).json({
        success : false,
        message: err.message
    });
};