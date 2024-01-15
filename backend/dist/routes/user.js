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
const user_1 = __importDefault(require("../database/model/user"));
const userRoute = (0, express_1.Router)();
userRoute.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Result from delete is : " + req);
    var result = yield user_1.default.destroy({
        where: {
            id: req.body.id
        }
    });
}));
userRoute.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const current_user = {
        id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };
    const result = yield user_1.default.update(current_user, {
        where: {
            id: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id
        }
    });
    res.json({ user: current_user });
    res.status(http_status_codes_1.StatusCodes.CREATED).send();
}));
exports.default = userRoute;
//# sourceMappingURL=user.js.map