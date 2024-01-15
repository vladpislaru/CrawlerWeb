"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../config/config");
const token_1 = __importDefault(require("../service/token"));
class Token extends sequelize_1.Model {
}
Token.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    token: {
        type: new sequelize_1.DataTypes.STRING(128),
    },
    expiresAt: {
        type: new sequelize_1.DataTypes.DATE,
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    tableName: 'tokens',
    sequelize: config_1.sequelize,
});
Token.beforeCreate((token, _) => {
    token.token = token_1.default.generateToken();
    token.expiresAt = token_1.default.generateExpirationDate();
});
exports.default = Token;
//# sourceMappingURL=token.js.map