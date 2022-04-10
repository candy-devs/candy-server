import { Sequelize } from "sequelize";
import { config } from "../config/config";
import { Article } from "./article";
import { User } from "./user";

export const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: "mysql",
  }
);

// User.hasMany(Article, {
//   foreignKey: "id",
//   // allowNull: false,
//   constraints: true,
//   onDelete: "cascade",
// });