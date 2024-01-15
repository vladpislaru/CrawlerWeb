import { CreationOptional, Model, DataTypes, InferAttributes, InferCreationAttributes, HasOneGetAssociationMixin } from "sequelize";
import { sequelize } from "../config/config";
import tokenService from "../service/token";
import User from "./user";

class Token 
extends Model<InferAttributes<Token>, InferCreationAttributes<Token>> {
    declare id: CreationOptional<number>;
    declare token: CreationOptional<string>;
    declare expiresAt: CreationOptional<Date>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    
    declare getUser: HasOneGetAssociationMixin<User>;
}

Token.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      token: {
        type: new DataTypes.STRING(128),
      },
      expiresAt: {
        type: new DataTypes.DATE,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'tokens',
      sequelize,
    }
)

Token.beforeCreate((token, _) => { 
    token.token = tokenService.generateToken();
    token.expiresAt = tokenService.generateExpirationDate();
})

export default Token;