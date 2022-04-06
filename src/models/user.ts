// CREATE TABLE `user` (
// 	`Uid` INT(11) NOT NULL AUTO_INCREMENT,
// 	`Id` VARCHAR(50) NOT NULL COLLATE 'utf8_general_ci',
// 	`Password` VARCHAR(150) NOT NULL COLLATE 'utf8_general_ci',
// 	`NickName` VARCHAR(50) NOT NULL COLLATE 'utf8_general_ci',
// 	/* 0: normal, 1: manager, 2: admin */
// 	`Permission` INT(11) NOT NULL,
// 	PRIMARY KEY (`Uid`) USING BTREE,
// 	FULLTEXT INDEX `Id` (`Id`)
// )
// COLLATE='utf8_general_ci'
// ENGINE=InnoDB
// ;

import { Model, DataTypes } from "sequelize";
import { sequelize } from "./index";

interface UserAttributes {
  Uid: number;
  Id: string;
  Password: string;
  NickName: string;
  Permission: number;
  CreateTime: number;
  UpdateTime: number;
}

export class User extends Model<UserAttributes> {
  public readonly Id!: number;
  public Uid!: string;
  public PassWord!: string;
  public NickName!: string;
  public Permission!: number;
  public CreateTime!: number;
  public UpdateTime!: number;
}

User.init(
  {
    Uid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Id: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Password: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    NickName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Permission: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CreateTime: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    UpdateTime: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
  },
  {
    modelName: "User",
    tableName: "user",
    sequelize,
    freezeTableName: true,
    timestamps: true,
    updatedAt: "updateTimestamp",
  }
);
