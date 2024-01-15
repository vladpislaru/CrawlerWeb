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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const token_1 = __importDefault(require("../database/model/token"));
const user_1 = __importDefault(require("../database/model/user"));
function loggedInAccount(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const tokenString = req.headers["token"];
        console.log(req.headers);
        if (!tokenString) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send();
            return;
        }
        const token = yield token_1.default.findOne({
            where: {
                token: tokenString
            },
            include: user_1.default
        });
        const user = (_a = yield (token === null || token === void 0 ? void 0 : token.getUser())) !== null && _a !== void 0 ? _a : null;
        if (!token) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send();
            return;
        }
        req.user = user;
        next();
    });
}
exports.default = loggedInAccount;
//# sourceMappingURL=loggedInAccount.js.map