import express, { Request, Response, NextFunction } from "express";
import logger, { LogInfo } from "../../../../logger";
import { SigninInterface, SigninResultCode, signinSchema } from "../../../../schema/auth.schema";
import { trySignin } from "../../../../service/signin.service";

const router = express.Router();

router.post(
  "/signin",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const value = await signinSchema.validateAsync(req.params);
      const result = await trySignin(value as SigninInterface);

      logger.info(LogInfo.create({req: req}));

      if (result !== SigninResultCode.success) {
        res.status(404).send();
      } else {
        res.send();
      }
    } catch (e) {
      logger.error(LogInfo.create({req: req, err: e }) );
      res.status(400).type("json").send();
    }
  }
);

export const routes = router;
