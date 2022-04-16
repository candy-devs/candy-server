"use strict";
exports.__esModule = true;
exports.config = void 0;
var env = process.env.NODE_ENV || "development";
var configFile = require(__dirname + "/../config/config.json")[env];
exports.config = {
    username: configFile.username,
    password: configFile.password,
    database: configFile.database,
    host: configFile.host,
    dialect: configFile.dialect,
    saltsessionv1: configFile.saltsessionv1,
    saltwebtokenv1: configFile.saltwebtokenv1,
    issuer: configFile.issuer
};