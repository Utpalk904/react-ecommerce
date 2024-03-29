const ErrorHandler = require("../utils/errhandler");
const catchAsyncErr = require("./catchAsyncErr");
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErr(
    async (req, res, next) => {
        let token = req.headers.authorization;

        if (!token) {
            return next(new ErrorHandler('Please Login to access this resource', 401));
        };

        if (token.startsWith('Bearer ')) {
            token = token.slice(7);
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decodedData.id);

        next();
    }
);

exports.authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role : ${req.user.role}, is not allowed to access`, 403));
        };

        next();
    }
}