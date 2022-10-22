"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var httpError_1 = __importDefault(require("../models/httpError"));
var upload = (0, multer_1.default)({
    // Use this if you want to store the file in the server
    // If you wanna store the file in the DB instead, use file.buffer
    // storage: multer.diskStorage({
    //   destination: (req, file, cb) => {
    //     cb(null, 'uploads')
    //   },
    //   filename: (req, file, cb) => {
    //     const imageName = `${uuidGenerator()}-${file.originalname}`
    //     cb(null, imageName)
    //   },
    // }),
    limits: {
        fileSize: 1024 * 1024 * 10, // 10MB
    },
    fileFilter: function (req, file, cb) {
        if (file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(null, true);
        }
        else {
            cb(new httpError_1.default('Please upload an image, accept (png, jpg, jpeg)', 400));
        }
    },
});
exports.default = upload;
