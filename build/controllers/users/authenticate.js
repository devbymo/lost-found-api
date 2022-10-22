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
var compareHashedPassword_1 = __importDefault(require("../../utils/compareHashedPassword"));
var generateAuthTokens_1 = __importDefault(require("../../utils/generateAuthTokens"));
var authenticate = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, phoneNumber, password, user, isMatch, token, userData, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, phoneNumber = _a.phoneNumber, password = _a.password;
                // Validate required fields
                if (!phoneNumber || !password) {
                    return [2 /*return*/, next(new httpError_1.default('Please provide phoneNumber and password', 400))];
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
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, user_1.default.findOne({ phoneNumber: phoneNumber })];
            case 2:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, next(new httpError_1.default('Invalid credentials', 401))];
                }
                return [4 /*yield*/, (0, compareHashedPassword_1.default)(password, user.password)];
            case 3:
                isMatch = _b.sent();
                if (!isMatch) {
                    return [2 /*return*/, next(new httpError_1.default('Invalid credentials', 401))];
                }
                token = (0, generateAuthTokens_1.default)(user.id);
                userData = {
                    id: user.id,
                    name: user.name,
                    phoneNumber: user.phoneNumber,
                    city: user.city,
                    country: user.country,
                    avatar: "".concat(process.env.NODE_ENV === 'dev' ? process.env.DEV_URL : process.env.PROD_URL, "/api/v1/users/").concat(user.id, "/avatar"),
                };
                res.status(200).json({
                    status: 'success',
                    message: 'User authenticated successfully',
                    data: {
                        user: userData,
                        token: token,
                    },
                });
                return [3 /*break*/, 5];
            case 4:
                err_1 = _b.sent();
                return [2 /*return*/, next(new httpError_1.default('Something went wrong, please try again', 500))];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.default = authenticate;
