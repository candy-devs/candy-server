import { Article } from "../models/article";
import { User } from "../models/user";
import {
  ArticleDeleteInterface,
  ArticleReadInterface,
  ArticleWriteInterface,
} from "../schema/article.schema";
import { getUserInfoBySession } from "./session.service";

export async function writeArticle(
  req: ArticleWriteInterface
): Promise<number> {
  const sess = await getUserInfoBySession(req.sess);
  if (sess === null) return -1;
  if (typeof sess == "number") return sess;

  const data = await Article.create({
    user_id: sess.user_id,
    board: req.board,
    title: req.title,
    body: req.body,
  });

  return data.id;
}

export async function readArticle(
  req: ArticleReadInterface
): Promise<Article | null> {
  return await Article.findByPk(req.id, {
    include: [{ model: User, attributes: ["user_id"] }],
  });
}

export async function deleteArticle(
  req: ArticleDeleteInterface
): Promise<number> {
  const sess = await getUserInfoBySession(req.sess);
  if (sess === null) return -1;
  if (typeof sess == "number") return sess;

  // result가 0이라면 삭제할 Row가 없음
  // result가 1이라면 삭제됨
  const result = await Article.destroy({
    where: { id: req.id, user_id: sess.user_id },
  });

  return result - 1;
}
