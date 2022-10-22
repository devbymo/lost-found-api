"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var usersRoutes_1 = __importDefault(require("./api/v1/usersRoutes"));
var itemsRoutes_1 = __importDefault(require("./api/v1/itemsRoutes"));
var routes = express_1.default.Router();
routes.use('/v1/users', usersRoutes_1.default);
routes.use('/v1/items', itemsRoutes_1.default);
exports.default = routes;
