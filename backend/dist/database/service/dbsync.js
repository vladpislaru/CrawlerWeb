"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = __importDefault(require("../model/token"));
const user_1 = __importDefault(require("../model/user"));
const links_1 = __importDefault(require("../model/links"));
class DBSyncService {
    sync() {
        user_1.default.sync();
        links_1.default.sync();
        token_1.default.sync();
    }
}
const dbSyncService = new DBSyncService();
exports.default = dbSyncService;
//# sourceMappingURL=dbsync.js.map