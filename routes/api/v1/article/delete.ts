import express, { Request, Response, NextFunction } from "express";
import { ArticleDeleteInterface, deleteSchema } from "../../../../schema/article.schema";
import { deleteArticle } from "../../../../service/article.service";

const router = express.Router();

router.delete(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const value = await deleteSchema.validateAsync(req.body);
      const result = await deleteArticle(value as ArticleDeleteInterface);

      if (result < 0)
        res.status(403).send();
      else
        res.type("json").send({ result: result });
    } catch (e) {
      console.log(e);
      res.status(400).type("json").send();
    }
  }
);

export const routes = router;
