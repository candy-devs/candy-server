import express, { Request, Response, NextFunction } from "express";
import logger, { LogInfo } from "../../../../logger";
import { createSession } from "../../../../service/auth.service";

const router = express.Router();

router.use(function (req, res, next) {
  if (req.session.isLogined === undefined) {
    try {
      createSession(req);
    } catch (e) {
      logger.error(LogInfo.create({req: req, err: e }) );
      res.status(500).type("json").send();
      return;
    }
  }
  next();
});

export const sessionMiddelware = router;