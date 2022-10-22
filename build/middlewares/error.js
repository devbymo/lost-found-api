"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var error = function (err, req, res, next) {
    // Check if response is already sent
    if (res.headersSent) {
        return next(err);
    }
    // Set status code and send error message
    var statusCode = err.statusCode || 500;
    var message = err.message || 'Something went wrong!';
    // Return the error
    res.status(statusCode);
    res.json({ message: message, status: 'error' });
};
exports.default = error;
