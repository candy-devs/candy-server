import express, { Request, Response, NextFunction } from "express";
import { sequelize } from "./models";

const PORT: number = parseInt(process.env.PORT as string);
const HOST: string = process.env.HOST || "localhost";

const app = express();

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  const ip = req.headers['x-forwarded-for'] ||  req.socket.remoteAddress;
  res.send(ip);
});

app.listen(PORT, HOST, () => {
  console.log(`server start ${HOST}:${PORT}`);
});
