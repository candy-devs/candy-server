import express, { Request, Response, NextFunction } from "express";
import logger, { LogInfo } from "../../../../../logger";
import { createSession } from "../../../../../service/auth.service";

const router = express.Router();

router.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      createSession(req);
      res.send();
    } catch (e) {
      logger.error(LogInfo.create({req: req, err: e }) );
      res.status(400).type("json").send();
    }
  }
);

export const routes = router;
