import express, { Request, Response, NextFunction } from "express";
import * as apiV1 from "./api/v1/routes";

const router = express.Router();

router.use('/api/v1', apiV1.routes);

router.get("/hello", (req: Request, res: Response, next: NextFunction) => {
  const ip = req.headers['x-forwarded-for'] ||  req.socket.remoteAddress;
  res.send(ip);
});

export const routes = router;