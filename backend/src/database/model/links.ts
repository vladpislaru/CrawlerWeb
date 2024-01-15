import { CreationOptional, Model, DataTypes, InferAttributes, InferCreationAttributes, HasOneGetAssociationMixin, ForeignKey } from "sequelize";
import { sequelize } from "../config/config";
import User from "./user";

class Link 
extends Model<InferAttributes<Link>, InferCreationAttributes<Link>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare link: string;
    declare count: number;
    declare UserId: ForeignKey<User['id']>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    
}

Link.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: new DataTypes.STRING(256),
        allowNull: false
    },
    link: {
        type: new DataTypes.STRING(256),
        allowNull: false
    },
    count:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'links',
      sequelize,
    }
)


export default Link;