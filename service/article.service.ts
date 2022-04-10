import { Article } from "../models/article";
import { ArticleWriteInterface } from "../schema/article.schema";
import { getSession } from "./session.service";

export async function writeArticle(
  req: ArticleWriteInterface
): Promise<number> {
  var sess = await getSession(req.sess);

  if (sess === null) return -1;

  var data = await Article.create({
    user_id: sess.user_id,
    board: req.board,
    title: req.title,
    body: req.body,
  });

  return data.id;
}
