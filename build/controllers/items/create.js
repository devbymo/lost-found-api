"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var item_1 = __importDefault(require("../../models/item"));
var validator_1 = __importDefault(require("validator"));
var httpError_1 = __importDefault(require("../../models/httpError"));
var user_1 = __importDefault(require("../../models/user"));
var mongoose_1 = __importDefault(require("mongoose"));
var create = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, category, description, country, city, creator, requiredFields, validCategories, newItem, user, err_1, session, item, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, category = _a.category, description = _a.description, country = _a.country, city = _a.city, creator = _a.creator;
                requiredFields = ['name', 'category', 'country', 'city', 'creator'];
                // Validate creator
                if (!creator || !validator_1.default.isMongoId(creator)) {
                    return [2 /*return*/, next(new httpError_1.default('Invalid creator id', 422))];
                }
                // Validate authenticated user
                if (req.userId !== creator) {
                    return [2 /*return*/, next(new httpError_1.default('You are not allowed to create items for other users', 401))];
                }
                // Validate required fields
                if (!name || !category || !country || !city || !creator) {
                    return [2 /*return*/, next(new httpError_1.default("Missing required fields ".concat(requiredFields), 400))];
                }
                // Validate name
                if (!validator_1.default.isLength(name, { min: 2, max: 50 })) {
                    return [2 /*return*/, next(new httpError_1.default('Name must be at least 2 characters', 400))];
                }
                validCategories = [
                    'mobile',
                    'laptop',
                    'keys',
                    'id',
                    'document',
                    'money',
                    'tablet',
                    'watch',
                    'camera',
                    'other',
                ];
                if (!validator_1.default.isIn(category.toLowerCase(), validCategories)) {
                    return [2 /*return*/, next(new httpError_1.default("Invalid category passed, valid categories ".concat(validCategories), 400))];
                }
                // Validate country
                if (!validator_1.default.isLength(country, { min: 2, max: 20 })) {
                    return [2 /*return*/, next(new httpError_1.default('Country must be at least 2 characters', 400))];
                }
                // Validate city
                if (!validator_1.default.isLength(city, { min: 2, max: 20 })) {
                    return [2 /*return*/, next(new httpError_1.default('City must be at least 2 characters', 400))];
                }
                // Validate description
                if (description && !validator_1.default.isLength(description, { min: 10, max: 200 })) {
                    return [2 /*return*/, next(new httpError_1.default('Description must be at least 10 characters', 400))];
                }
                newItem = new item_1.default({
                    name: name,
                    category: category.toLowerCase(),
                    description: description,
                    country: country.toLowerCase(),
                    city: city.toLowerCase(),
                    creator: creator,
                });
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_1.default.findById(creator)];
            case 2:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, next(new httpError_1.default('Invalid creator id', 404))];
                }
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                return [2 /*return*/, next(new httpError_1.default('Something went wrong', 500))];
            case 4:
                _b.trys.push([4, 9, , 10]);
                return [4 /*yield*/, mongoose_1.default.startSession()];
            case 5:
                session = _b.sent();
                session.startTransaction();
                return [4 /*yield*/, newItem.save({ session: session })
                    // Add new item to user's items
                ];
            case 6:
                item = _b.sent();
                // Add new item to user's items
                user.items.push(newItem.id);
                return [4 /*yield*/, user.save({ session: session })];
            case 7:
                _b.sent();
                return [4 /*yield*/, session.commitTransaction()];
            case 8:
                _b.sent();
                session.endSession();
                res.status(201).json({
                    status: 'success',
                    message: 'Item created successfully',
                    data: {
                        item: __assign(__assign({}, item.toObject({ getters: true })), { image: "".concat(process.env.NODE_ENV === 'dev' ? process.env.DEV_URL : process.env.PROD_URL, "/api/v1/items/").concat(item.id, "/image") }),
                    },
                });
                return [3 /*break*/, 10];
            case 9:
                err_2 = _b.sent();
                return [2 /*return*/, next(new httpError_1.default('Creating item failed, please try again', 500))];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.default = create;
