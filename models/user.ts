import { Model, DataTypes } from "sequelize";
import { sequelize } from "./index";

// https://runebook.dev/ko/docs/sequelize/manual/typescript

interface UserAttributes {
  user_id: string;
  password: string;
  user_name: string;
  permission: number;
}

// https://joshua1988.github.io/ts/usage/mapped-type.html#%EB%A7%B5%EB%93%9C-%ED%83%80%EC%9E%85-%EC%8B%A4%EC%9A%A9-%EC%98%88%EC%A0%9C-2
export type UserAttributesUpdate = {
  [P in keyof UserAttributes]?: UserAttributes[P];
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