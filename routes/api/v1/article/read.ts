import express, { Request, Response, NextFunction } from "express";
import logger, { LogInfo } from "../../../../logger";
import { ArticleReadInterface, readSchema } from "../../../../schema/article.schema";
import { readArticle } from "../../../../service/article.service";

const router = express.Router();

router.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const value = await readSchema.validateAsync(req.params);
      const article = await readArticle(value as ArticleReadInterface);

      logger.info(LogInfo.create({req: req}));
      
      if (article == null) {
        res.status(404).send();
      } else {
        res.type("json").send(article.toJSON());
      }
    } catch (e) {
      logger.error(LogInfo.create({req: req, err: e }) );
      res.status(400).type("json").send();
    }
  }
);

export const routes = router;
