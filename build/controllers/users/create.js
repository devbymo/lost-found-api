"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = __importDefault(require("../../models/user"));
var httpError_1 = __importDefault(require("../../models/httpError"));
var validator_1 = __importDefault(require("validator"));
var generateAuthTokens_1 = __importDefault(require("../../utils/generateAuthTokens"));
var create = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, phoneNumber, password, city, country, user, err_1, newUser, user_2, token, userData, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, phoneNumber = _a.phoneNumber, password = _a.password, city = _a.city, country = _a.country;
                // Check required fields
                if (!name || !phoneNumber || !password) {
                    return [2 /*return*/, next(new httpError_1.default('Please fill in all fields', 400))];
                }
                // Validate phone number
                if (!validator_1.default.isMobilePhone(phoneNumber) ||
                    !validator_1.default.isLength(phoneNumber, { min: 11, max: 11 })) {
                    return [2 /*return*/, next(new httpError_1.default('Please enter a valid phone number', 400))];
                }
                // Validate password
                if (!validator_1.default.isLength(password, { min: 4, max: 50 })) {
                    return [2 /*return*/, next(new httpError_1.default('Password must be at least 4 characters', 400))];
                }
                // Validate name
                if (!validator_1.default.isLength(name, { min: 2, max: 20 })) {
                    return [2 /*return*/, next(new httpError_1.default('Name must be at least 2 characters', 400))];
                }
                // Validate city if passed
                if (city && !validator_1.default.isLength(city, { min: 2, max: 20 })) {
                    return [2 /*return*/, next(new httpError_1.default('City must be at least 2 characters', 400))];
                }
                // Validate country if passed
                if (country && !validator_1.default.isLength(country, { min: 2, max: 20 })) {
                    return [2 /*return*/, next(new httpError_1.default('Country must be at least 2 characters', 400))];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_1.default.findOne({ phoneNumber: phoneNumber })];
            case 2:
                user = (_b.sent());
                if (user) {
                    return [2 /*return*/, next(new httpError_1.default('User already exists', 400))];
                }
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                return [2 /*return*/, next(new httpError_1.default('Something went wrong, please try again', 500))];
            case 4:
                newUser = {
                    name: name,
                    phoneNumber: phoneNumber,
                    password: password,
                    city: city ? city.toLowerCase() : 'cairo',
                    country: country ? country.toLowerCase() : 'egypt',
                };
                _b.label = 5;
            case 5:
                _b.trys.push([5, 8, , 9]);
                return [4 /*yield*/, user_1.default.create(newUser)];
            case 6:
                user_2 = _b.sent();
                if (!user_2) {
                    return [2 /*return*/, next(new httpError_1.default('Something went wrong, please try again', 500))];
                }
                return [4 /*yield*/, (0, generateAuthTokens_1.default)(user_2.id)];
            case 7:
                token = _b.sent();
                if (!token) {
                    return [2 /*return*/, next(new httpError_1.default('Something went wrong, please try again', 500))];
                }
                userData = {
                    id: user_2.id,
                    name: user_2.name,
                    phoneNumber: user_2.phoneNumber,
                    city: user_2.city,
                    country: user_2.country,
                    avatar: "".concat(process.env.NODE_ENV === 'dev' ? process.env.DEV_URL : process.env.PROD_URL, "/api/v1/users/").concat(user_2.id, "/avatar"),
                };
                res.status(201).json({
                    status: 'success',
                    message: 'User created successfully',
                    data: {
                        user: userData,
                        token: token,
                    },
                });
                return [3 /*break*/, 9];
            case 8:
                error_1 = _b.sent();
                next(error_1);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.default = create;
