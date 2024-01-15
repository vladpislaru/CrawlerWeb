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
const user_1 = __importDefault(require("../database/model/user"));
const http_status_codes_1 = require("http-status-codes");
const registerRouter = (0, express_1.Router)();
registerRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_1.default.create(req.body);
    res.json(result);
    res.status(http_status_codes_1.StatusCodes.CREATED).send();
}));
exports.default = registerRouter;
//# sourceMappingURL=register.js.map