import express, { Request, Response, NextFunction } from "express";
import logger from "../../../../logger";
import {
  ArticleWriteInterface,
  writeSchema,
} from "../../../../schema/article.schema";
import { writeArticle } from "../../../../service/article.service";

const router = express.Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const value = await writeSchema.validateAsync(req.body);
    const reqIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const result = await writeArticle(
      value as ArticleWriteInterface,
      reqIp as string
    );

    if (result < 0) res.status(403).send();
    else res.type("json").send({ result: result });
  } catch (e) {
    // console.log(e);
    logger.error(e);
    res.status(400).type("json").send();
  }
});

export const routes = router;
