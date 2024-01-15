import { Sequelize, Model, InferAttributes, InferCreationAttributes } from 'sequelize';

// export const sequelize = new Sequelize('sqlite::memory:');
export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite"
});



