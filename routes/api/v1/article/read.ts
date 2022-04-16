import express, { Request, Response, NextFunction } from "express";
import { Article } from "../../../../models/article";
import { User } from "../../../../models/user";
import { readSchema } from "../../../../schema/article.schema";
import { readArticle } from "../../../../service/article.service";

const router = express.Router();

router.get(
  "/read/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const value = await readSchema.validateAsync(req.params);
      const article = await readArticle(value.id);

      if (article == null) {
        res.status(404).send();
      } else {
        res.type("json").send(article.toJSON());
      }
    } catch (e) {
      console.log(e);
      res.status(400).type("json").send();
    }
  }
);

export const routes = router;
