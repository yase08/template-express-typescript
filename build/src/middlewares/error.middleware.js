"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.notFound = void 0;
const notFound = (req, res, next) => {
    const error = new Error(`Route Not Found ${req.originalUrl}`);
    res.status(404);
    next(error);
};
exports.notFound = notFound;
const handleError = (error, res) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    console.log(error.stack);
    res.json({
        status: false,
        message: error.message,
        stack: error.stack,
    });
};
exports.handleError = handleError;
