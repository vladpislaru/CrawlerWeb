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
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const token_1 = __importDefault(require("../database/model/token"));
const user_1 = __importDefault(require("../database/model/user"));
const encrypt_1 = __importDefault(require("../database/service/encrypt"));
const loginRouter = (0, express_1.Router)();
loginRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ where: { email: req.body.email } });
    var pages;
    var extPages;
    // [pages, extPages] = await crawlPage("https://pub.academia.edu/CiprianDobre/", "https://pub.academia.edu/CiprianDobre/", new Map<string, number>(), new Map<string, number>(), [], "CiprianDobre");
    // console.log("AM ajuns aici " + JSON.stringify(pages));
    // printReport(pages, extPages, "https://pub.academia.edu/CiprianDobre/");
    if (!user) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send();
        return;
    }
    const passwordMatches = yield encrypt_1.default.checkPassword(req.body, user);
    if (!passwordMatches) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send();
        return;
    }
    const token = yield token_1.default.create();
    user.setToken(token);
    res.json({
        token: token.token,
        expiresAt: token.expiresAt,
        user: user
    });
}));
exports.default = loginRouter;
//# sourceMappingURL=login.js.map