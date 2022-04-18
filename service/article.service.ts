import { Article } from "../models/article";
import { User } from "../models/user";
import {
  ArticleDeleteInterface,
  ArticleReadInterface,
  ArticleWriteInterface,
  ArticleWriteResultCode,
} from "../schema/article.schema";
import { getUserInfoBySession } from "./session.service";
import { createHash } from "crypto";

export async function writeArticle(
  req: ArticleWriteInterface,
  authorIp: string
): Promise<ArticleWriteResultCode | number> {
  if (req.type == 1) {
    return await writeArticleLogined(req);
  } else if (req.type == 2) {
    return await writeArticleLoginedAnonymous(req, authorIp);
  }

  return await writeArticleAnonymous(req, authorIp);
}

async function writeArticleAnonymous(
  req: ArticleWriteInterface,
  authorIp: string
): Promise<ArticleWriteResultCode | number> {
  if (req.password === null) return ArticleWriteResultCode.passwordMissing;

  const encryptedPassword = createHash("sha1")
    .update(req.password!)
    .digest("hex");

  const data = await Article.create({
    board: req.board,
    title: req.title,
    body: req.body,
    author: authorIp,
    password: encryptedPassword,
  });

  return data.id;
}

async function writeArticleLogined(
  req: ArticleWriteInterface
): Promise<ArticleWriteResultCode | number> {
  const sess = await getUserInfoBySession(req.sess);
  if (sess === null) return ArticleWriteResultCode.sessionExpired;

  const data = await Article.create({
    user_id: sess.user_id,
    board: req.board,
    title: req.title,
    body: req.body,
  });

  return data.id;
}

async function writeArticleLoginedAnonymous(
  req: ArticleWriteInterface,
  authorIp: string
): Promise<ArticleWriteResultCode | number> {
  const sess = await getUserInfoBySession(req.sess);
  if (sess === null) return ArticleWriteResultCode.sessionExpired;

  const data = await Article.create({
    user_id: sess.user_id,
    board: req.board,
    title: req.title,
    body: req.body,
    author: authorIp,
  });

  return data.id;
}

export async function readArticle(
  req: ArticleReadInterface
): Promise<Article | null> {
  return await Article.findByPk(req.id, {
    attributes: { exclude: ["password"] },
    include: [{ model: User, attributes: ["user_id"] }],
  });
}

export async function deleteArticle(
  req: ArticleDeleteInterface
): Promise<number> {
  const sess = await getUserInfoBySession(req.sess);
  if (sess === null) return -1;

  // result가 0이라면 삭제할 Row가 없음
  // result가 1이라면 삭제됨
  const result = await Article.destroy({
    where: { id: req.id, user_id: sess.user_id },
  });

  return result - 1;
}
