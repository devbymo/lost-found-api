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
var httpError_1 = __importDefault(require("../../models/httpError"));
var validator_1 = __importDefault(require("validator"));
var indexByUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, page, limit, sortBy, validSorts, order, validOrders, skip, items, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.id;
                // Validate user id
                if (!userId || !validator_1.default.isMongoId(userId)) {
                    return [2 /*return*/, next(new httpError_1.default('Invalid user id', 400))];
                }
                page = req.query.page ? parseInt(req.query.page) : 1;
                if (isNaN(page) || page < 1) {
                    return [2 /*return*/, next(new httpError_1.default('Invalid page number', 400))];
                }
                limit = req.query.limit ? parseInt(req.query.limit) : 5;
                if (isNaN(limit) || limit < 1) {
                    return [2 /*return*/, next(new httpError_1.default('Invalid limit', 400))];
                }
                sortBy = req.query.sortBy ? req.query.sort : 'createdAt';
                validSorts = ['createdAt', 'updatedAt'];
                if (!validator_1.default.isIn(sortBy, validSorts)) {
                    return [2 /*return*/, next(new httpError_1.default("Invalid sort passed, valid sorts ".concat(validSorts), 400))];
                }
                order = req.query.order ? req.query.order : 'desc' // recently created items first
                ;
                validOrders = ['asc', 'desc'];
                if (!validator_1.default.isIn(order, validOrders)) {
                    return [2 /*return*/, next(new httpError_1.default("Invalid order passed, valid orders ".concat(validOrders), 400))];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                skip = (page - 1) * limit;
                return [4 /*yield*/, item_1.default.find({ creator: userId })
                        .skip(skip)
                        .limit(limit)
                        .sort([[sortBy, order === 'asc' ? 1 : -1]])
                        .exec()];
            case 2:
                items = _a.sent();
                if (!items || items.length === 0) {
                    return [2 /*return*/, next(new httpError_1.default('No items found', 404))];
                }
                res.status(200).json({
                    status: 'success',
                    message: 'Items fetched successfully',
                    data: {
                        items: items.map(function (item) {
                            return __assign(__assign({}, item.toObject({ getters: true })), { image: "".concat(process.env.NODE_ENV === 'dev' ? process.env.DEV_URL : process.env.PROD_URL, "/api/v1/items/").concat(item.id, "/image") });
                        }),
                    },
                });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                return [2 /*return*/, next(new httpError_1.default('Something went wrong' + err_1, 500))];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.default = indexByUser;
