"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../config/config");
class Link extends sequelize_1.Model {
}
Link.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: new sequelize_1.DataTypes.STRING(256),
        allowNull: false
    },
    link: {
        type: new sequelize_1.DataTypes.STRING(256),
        allowNull: false
    },
    count: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    tableName: 'links',
    sequelize: config_1.sequelize,
});
exports.default = Link;
//# sourceMappingURL=links.js.map