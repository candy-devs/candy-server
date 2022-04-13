import { Model, DataTypes } from "sequelize";
import { User } from "./user";
import { sequelize } from "./index";

// const sequelize = require("./index");

interface SessionAttributes {
  session?: string;
  user_id: number;
  expire?: number;
}

export class Session extends Model<SessionAttributes> {
  declare id: number;
  public user_id!: number;
  public session?: string;
  public expire?: number;
}

Session.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    session: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    expire: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    modelName: "Session",
    tableName: "Session",
    sequelize,
    freezeTableName: true,
    timestamps: true,
    indexes: [{
      unique: false,
      fields: ['user_id'],
    }]
  }
);

Session.belongsTo(User, {
  foreignKey: "user_id",
});