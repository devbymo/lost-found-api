"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var httpError_1 = __importDefault(require("../models/httpError"));
var auth = function (req, res, next) {
    var _a;
    try {
        // Get token from the header
        var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        // Check if token exists
        if (!token) {
            throw new httpError_1.default('Authentication faild!', 401);
        }
        // Verify token
        var jwtSecret = process.env.JWT_SECRET;
        var decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        // check decoded token
        if (!decoded) {
            throw new httpError_1.default('Authentication faild!', 401);
        }
        // Add user to the request to be used in the controller
        req.userId = decoded.userId;
        // Forward the request
        next();
    }
    catch (error) {
        return next(new httpError_1.default('Authentication faild!', 401));
    }
};
exports.default = auth;
