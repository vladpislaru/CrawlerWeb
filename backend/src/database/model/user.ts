import { CreationOptional, Model, DataTypes, InferAttributes, InferCreationAttributes, HasOneGetAssociationMixin, HasOneSetAssociationMixin, HasManyGetAssociationsMixin, HasManySetAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManyCreateAssociationMixin, ForeignKey } from "sequelize";
import { sequelize } from "../config/config";
import { PasswordHashOwner } from "../config/types";
import encryptService from "../service/encrypt";
import Token from "./token";
import Link from "./links";

class User 
extends Model<InferAttributes<User>, InferCreationAttributes<User>>
implements PasswordHashOwner {
    declare id: CreationOptional<number>;
    declare name: string;
    declare email: string;
    declare password: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    declare getToken: HasOneGetAssociationMixin<Token>;
    declare setToken: HasOneSetAssociationMixin<Token, number>;

    declare getLinks: HasManyGetAssociationsMixin<Link>;
    declare setLinks: HasManySetAssociationsMixin<Link, number>;
    declare removeLink: HasManyRemoveAssociationMixin<Link, number>;
    declare removeLinks: HasManyRemoveAssociationsMixin<Link, number>;
    declare createLink: HasManyCreateAssociationMixin<Link, 'UserId'>;

    declare getFamily: HasOneGetAssociationMixin<User>;
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      email: {
        validate: {
          isEmail: true
        },
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      password: {
        validate: {
          len: [8, 40]
        },
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'users',
      sequelize,
    }
)

Token.belongsTo(User, { targetKey: 'id' });

User.hasOne(Token, {
  sourceKey: 'id',
  foreignKey: 'UserId',
});

User.hasMany(Link);


User.beforeCreate(async (user, _) => {
  const passwordHash = await encryptService.encryptPassword(user.password);
  user.password = passwordHash;

})


export default User;