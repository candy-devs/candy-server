import express, { Request, Response, NextFunction } from "express";
import { Article } from "../../../../models/article";

const router = express.Router();

router.get("/read/:id", async (req: Request, res: Response, next: NextFunction) =>  {
  const article = await Article.findByPk(req.params.id);
  if (article == null) {
    res.status(404).send();
  } else {
    res.type('json').send(article.toJSON());
  }
});

export const routes = router;