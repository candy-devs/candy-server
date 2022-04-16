import { Model, DataTypes } from "sequelize";
import { User } from "./user";
import { sequelize } from "./index";

// const sequelize = require("./index");

// https://runebook.dev/ko/docs/sequelize/manual/typescript

interface ArticleAttributes {
  id?: number;
  title: string;
  body: string;
  upvote?: number;
  view?: number;
  board: number;
  user_id: number;
}

// https://typescript-kr.github.io/pages/declaration-files/templates/global-plugin.d.ts.html
// https://joshua1988.github.io/ts/usage/mapped-type.html#%EB%A7%B5%EB%93%9C-%ED%83%80%EC%9E%85-%EC%8B%A4%EC%9A%A9-%EC%98%88%EC%A0%9C-2
export type ArticleAttributesUpdate = {
  [P in keyof ArticleAttributes]?: ArticleAttributes[P];
}

export class Article extends Model<ArticleAttributes> {
  declare id: number;
  public title!: string;
  public body!: string;
  public upvote?: number;
  public view?: number;
  public board!: number;
  public user_id!: number;
}

Article.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    upvote: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    view: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    board: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    modelName: "Article",
    tableName: "Article",
    sequelize,
    freezeTableName: true,
    timestamps: true,
    updatedAt: "updateTimestamp",
  }
);

Article.belongsTo(User, {
  foreignKey: "user_id",
});