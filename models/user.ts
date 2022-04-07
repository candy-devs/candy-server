import { Model, DataTypes } from "sequelize";
import { sequelize } from "./index";

// https://runebook.dev/ko/docs/sequelize/manual/typescript

interface UserAttributes {
  user_id: string;
  password: string;
  user_name: string;
  permission: number;
}

export class User extends Model<UserAttributes> {
  public user_id!: string;
  public password!: string;
  public user_name!: string;
  public permission!: number;
}

User.init(
  {
    user_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    user_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    permission: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  },
  {
    modelName: "User",
    tableName: "User",
    sequelize,
    freezeTableName: true,
    timestamps: true,
    updatedAt: "updateTimestamp",
  }
);