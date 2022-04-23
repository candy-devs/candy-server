
import * as session from "express-session";
import mysqlSession from "express-mysql-session";
import { config } from "../../config/config";

const MySQLStore = mysqlSession(session);

declare module "express-session" {
  interface SessionData {
    isLogined: boolean;
    userId: number;
    clientIp: string;
  }
}

export const sessionStore = new MySQLStore({
  host: config.session.host,
  port: 3306,
  user: config.session.username,
  password: config.session.password,
  database: config.session.database,
});
