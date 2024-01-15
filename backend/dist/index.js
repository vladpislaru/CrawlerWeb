"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const dbsync_1 = __importDefault(require("./database/service/dbsync"));
const login_1 = __importDefault(require("./routes/login"));
const register_1 = __importDefault(require("./routes/register"));
const body_parser_1 = __importDefault(require("body-parser"));
const loggedInAccount_1 = __importDefault(require("./middleware/loggedInAccount"));
const user_1 = __importDefault(require("./routes/user"));
const links_1 = __importDefault(require("./routes/links"));
const cors = require('cors');
dbsync_1.default.sync();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(cors());
const appScopedRoutes = (0, express_1.Router)();
appScopedRoutes.use("/login", login_1.default);
appScopedRoutes.use("/register", register_1.default);
const userScoperRoutes = (0, express_1.Router)();
userScoperRoutes.use(loggedInAccount_1.default);
userScoperRoutes.use("/users", user_1.default);
userScoperRoutes.use("/links", links_1.default);
app.use("/", appScopedRoutes);
app.use("/", userScoperRoutes);
app.listen(8080, () => {
    console.log('The application is listening on port 8080!');
});
//# sourceMappingURL=index.js.map