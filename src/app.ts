import express, { Request, Response, NextFunction } from "express";
import { sequelize } from "./models";
import { User } from "./models/user";

import { routes } from "./routes/routes";

const PORT: number = parseInt(process.env.PORT as string) || 8864;
const HOST: string = process.env.HOST || "localhost";

const app = express();

app.use(routes);

app.listen(PORT, HOST, () => {
  console.log(`server start ${HOST}:${PORT}`);
});

User.sync({force:true});