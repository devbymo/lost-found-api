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
var validator_1 = __importDefault(require("validator"));
var httpError_1 = __importDefault(require("../../models/httpError"));
var item_1 = __importDefault(require("../../models/item"));
var mongoose_1 = __importDefault(require("mongoose"));
var remove = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, session, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                // validate id is a valid mongo id before querying database
                if (!validator_1.default.isMongoId(id)) {
                    return [2 /*return*/, next(new httpError_1.default('Invalid ID', 400))];
                }
                // validate authenticated user
                if (req.userId !== id) {
                    return [2 /*return*/, next(new httpError_1.default('You are not allowed to delete other users', 401))];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                return [4 /*yield*/, user_1.default.findById(id)];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, next(new httpError_1.default('User does not exist', 400))];
                }
                return [4 /*yield*/, mongoose_1.default.startSession()];
            case 3:
                session = _a.sent();
                session.startTransaction();
                // Delete the user
                return [4 /*yield*/, user.remove({ session: session })
                    // Delete user's items
                ];
            case 4:
                // Delete the user
                _a.sent();
                // Delete user's items
                return [4 /*yield*/, item_1.default.deleteMany({ creator: id }, { session: session })
                    // Commit the transaction
                ];
            case 5:
                // Delete user's items
                _a.sent();
                // Commit the transaction
                return [4 /*yield*/, session.commitTransaction()
                    // Close the session
                ];
            case 6:
                // Commit the transaction
                _a.sent();
                // Close the session
                session.endSession();
                res.status(200).json({ status: 'success', message: 'User deleted successfully' });
                return [3 /*break*/, 8];
            case 7:
                err_1 = _a.sent();
                return [2 /*return*/, next(new httpError_1.default('Something went wrong, please try again', 500))];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.default = remove;
