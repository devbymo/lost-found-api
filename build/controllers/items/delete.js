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
var item_1 = __importDefault(require("../../models/item"));
var validator_1 = __importDefault(require("validator"));
var httpError_1 = __importDefault(require("../../models/httpError"));
var mongoose_1 = __importDefault(require("mongoose"));
var user_1 = __importDefault(require("../../models/user"));
var remove = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var itemId, userId, user, err_1, item, session, userItems, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                itemId = req.params.id;
                userId = req.userId;
                // Validate the item id
                if (!itemId || !validator_1.default.isMongoId(itemId)) {
                    return [2 /*return*/, next(new httpError_1.default('Invalid item id', 422))];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_1.default.findById(userId)];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, next(new httpError_1.default('Item creator does not exist', 404))];
                }
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                return [2 /*return*/, next(new httpError_1.default('Something went wrong', 500))];
            case 4:
                _a.trys.push([4, 10, , 11]);
                return [4 /*yield*/, item_1.default.findById(itemId)];
            case 5:
                item = (_a.sent());
                if (!item) {
                    return [2 /*return*/, next(new httpError_1.default('Item not found', 404))];
                }
                if (item.creator.toString() !== userId) {
                    return [2 /*return*/, next(new httpError_1.default('You are not allowed to delete this item', 403))];
                }
                return [4 /*yield*/, mongoose_1.default.startSession()];
            case 6:
                session = _a.sent();
                session.startTransaction();
                // Delete the item
                return [4 /*yield*/, item.remove({ session: session })
                    // Delete item from user's items
                ];
            case 7:
                // Delete the item
                _a.sent();
                userItems = user.items.filter(function (item) { return item.toString() !== itemId; });
                user.items = userItems;
                return [4 /*yield*/, user.save({ session: session })
                    // Commit the transaction
                ];
            case 8:
                _a.sent();
                // Commit the transaction
                return [4 /*yield*/, session.commitTransaction()
                    // Close the session
                ];
            case 9:
                // Commit the transaction
                _a.sent();
                // Close the session
                session.endSession();
                res.status(200).json({
                    status: 'success',
                    message: 'Item deleted successfully',
                });
                return [3 /*break*/, 11];
            case 10:
                err_2 = _a.sent();
                return [2 /*return*/, next(new httpError_1.default('Something went wrong', 500))];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.default = remove;
