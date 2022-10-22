"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var create_1 = __importDefault(require("../../../controllers/users/create"));
var delete_1 = __importDefault(require("../../../controllers/users/delete"));
var show_1 = __importDefault(require("../../../controllers/users/show"));
var update_1 = __importDefault(require("../../../controllers/users/update"));
var authenticate_1 = __importDefault(require("../../../controllers/users/authenticate"));
var auth_1 = __importDefault(require("../../../middlewares/auth"));
var uploadAvatar_1 = __importDefault(require("../../../controllers/users/uploadAvatar"));
var upload_1 = __importDefault(require("../../../middlewares/upload"));
var deleteAvatar_1 = __importDefault(require("../../../controllers/users/deleteAvatar"));
var getAvatar_1 = __importDefault(require("../../../controllers/users/getAvatar"));
var userRoutes = (0, express_1.Router)();
userRoutes.get('/:id/avatar', getAvatar_1.default);
userRoutes.get('/:id', show_1.default);
// userRoutes.get('/', index) For testing purposes
userRoutes.post('/avatar', auth_1.default, upload_1.default.single('avatar'), uploadAvatar_1.default);
userRoutes.post('/authenticate', authenticate_1.default);
userRoutes.post('/signup', create_1.default);
userRoutes.patch('/:id', auth_1.default, update_1.default);
userRoutes.delete('/:id', auth_1.default, delete_1.default);
userRoutes.delete('/avatar', auth_1.default, deleteAvatar_1.default);
exports.default = userRoutes;
