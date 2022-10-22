"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv = __importStar(require("dotenv"));
var index_1 = __importDefault(require("./routes/index"));
var routeNotFound_1 = __importDefault(require("./middlewares/routeNotFound"));
var error_1 = __importDefault(require("./middlewares/error"));
var helmet_1 = __importDefault(require("helmet"));
var cors_1 = __importDefault(require("cors"));
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
dotenv.config();
var app = (0, express_1.default)();
// Body parser
app.use(express_1.default.json());
// CORS
var corsOptions = {
    origin: process.env.CORS_ORIGIN || '*',
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
// HTTP security headers
app.use((0, helmet_1.default)());
// Request limit
var limiter = (0, express_rate_limit_1.default)({
    windowMs: typeof process.env.REQEST_LIMIT_TIMEOUT === 'string'
        ? parseInt(process.env.REQEST_LIMIT_TIMEOUT)
        : 15 * 60 * 1000,
    max: typeof process.env.REQEST_NUMBER_LIMIT === 'string'
        ? parseInt(process.env.REQEST_NUMBER_LIMIT)
        : 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again later',
});
app.use(limiter);
// API Routes
app.use('/api', index_1.default);
// Route not found
app.use(routeNotFound_1.default);
// Error handler (Generic)
app.use(error_1.default);
exports.default = app;
