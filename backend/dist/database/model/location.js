"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../config/config");
class Location extends sequelize_1.Model {
}
Location.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false
    },
    latitude: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false
    },
    longitude: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false
    },
    familyShared: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    tableName: 'locations',
    sequelize: config_1.sequelize,
});
exports.default = Location;
//# sourceMappingURL=location.js.map