const env = process.env.NODE_ENV || "development";
const configFile = require(__dirname + "/../config/config.json")[env];

const config = {
  username: configFile.username,
  password: configFile.password,
  database: configFile.database,
  host: configFile.host,
  dialect: configFile.dialect,
  saltsessionv1: configFile.saltsessionv1,
  saltwebtokenv1: configFile.saltwebtokenv1,
  issuer: configFile.issuer,
};

export default config;