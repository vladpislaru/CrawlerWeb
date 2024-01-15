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
const sequelize_1 = require("sequelize");
const config_1 = require("../config/config");
const encrypt_1 = __importDefault(require("../service/encrypt"));
const token_1 = __importDefault(require("./token"));
const links_1 = __importDefault(require("./links"));
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    email: {
        validate: {
            isEmail: true
        },
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    password: {
        validate: {
            len: [8, 40]
        },
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    tableName: 'users',
    sequelize: config_1.sequelize,
});
token_1.default.belongsTo(User, { targetKey: 'id' });
User.hasOne(token_1.default, {
    sourceKey: 'id',
    foreignKey: 'UserId',
});
User.hasMany(links_1.default);
User.beforeCreate((user, _) => __awaiter(void 0, void 0, void 0, function* () {
    const passwordHash = yield encrypt_1.default.encryptPassword(user.password);
    user.password = passwordHash;
}));
exports.default = User;
//# sourceMappingURL=user.js.map