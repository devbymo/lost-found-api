"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var httpError_1 = __importDefault(require("../models/httpError"));
var routeNotFound = function (_req, _res, next) {
    next(new httpError_1.default('Route not found!', 404));
};
exports.default = routeNotFound;
