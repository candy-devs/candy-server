import { Article } from "../models/article";
import { User } from "../models/user";
import {
  ArticleDeleteInterface,
  ArticleReadInterface,
  ArticleWriteInterface,
  ArticleWriteResultCode,
} from "../schema/article.schema";
// import { getUserInfoBySession } from "./auth/auth.service";
import { createHash } from "crypto";
import { config } from "../config/config";
import { Request } from "express";
import { getUserLoginInfo } from "./auth/auth.service";

function getEncryptedPassword(password: string): string {
  return createHash("sha1")
    .update(password + config.saltarticlepassword)
    .digest("hex");
}

export async function writeArticle(
  req: Request,
  data: ArticleWriteInterface,
  authorIp: string
): Promise<ArticleWriteResultCode | number> {
  if (data.type == 1) {
    return await writeArticleLogined(req, data);
  } else if (data.type == 2) {
    return await writeArticleLoginedAnonymous(req, data, authorIp);
  }

  return await writeArticleAnonymous(data, authorIp);
}

async function writeArticleAnonymous(
  req: ArticleWriteInterface,
  authorIp: string
): Promise<ArticleWriteResultCode | number> {
  if (req.password === null) return ArticleWriteResultCode.passwordMissing;

  const encryptedPassword = getEncryptedPassword(req.password!);

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
  req: Request,
  data: ArticleWriteInterface
): Promise<ArticleWriteResultCode | number> {
  const loginInfo = getUserLoginInfo(req);
  if (loginInfo === null) return ArticleWriteResultCode.unknownError;

  const article = await Article.create({
    user_id: loginInfo.id,
    board: data.board,
    title: data.title,
    body: req.body,
  });

  return article.id;
}

async function writeArticleLoginedAnonymous(
  req: Request,
  data: ArticleWriteInterface,
  authorIp: string
): Promise<ArticleWriteResultCode | number> {
  const loginInfo = getUserLoginInfo(req);
  if (loginInfo === null) return ArticleWriteResultCode.unknownError;

  const article = await Article.create({
    user_id: loginInfo.id,
    board: data.board,
    title: data.title,
    body: req.body,
    author: authorIp,
  });

  return article.id;
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
  req: Request,
  data: ArticleDeleteInterface
): Promise<number> {
  if (data.password !== null) {
    return await deleteArticleAnonymous(data);
  }

  return await deleteArticleLogined(req, data);
}

async function deleteArticleLogined(
  req: Request,
  data: ArticleDeleteInterface
): Promise<number> {
  const loginInfo = getUserLoginInfo(req);
  if (loginInfo === null) return ArticleWriteResultCode.unknownError;

  // result가 0이라면 삭제할 Row가 없음
  // result가 1이라면 삭제됨
  const result = await Article.destroy({
    where: { id: data.id, user_id: loginInfo.id },
  });

  return result - 1;
}

async function deleteArticleAnonymous(
  data: ArticleDeleteInterface
): Promise<number> {
  const encryptedPassword = getEncryptedPassword(data.password!);

  // result가 0이라면 삭제할 Row가 없음
  // result가 1이라면 삭제됨
  const result = await Article.destroy({
    where: { id: data.id, password: encryptedPassword },
  });

  return result - 1;
}
