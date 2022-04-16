import Joi from "joi";

export interface ArticleWriteInterface {
  sess: string;
  title: string;
  body: string;
  board: number;
}

export const writeSchema = Joi.object({
  sess: Joi.string().max(512).required(),
  title: Joi.string().max(64).required(),
  body: Joi.string().max(65535).required(),
  board: Joi.number().integer().min(0).required(),
});

export interface ArticleReadInterface {
  id: number;
}

export const readSchema = Joi.object({
  id: Joi.number().integer().min(0).required(),
});

export interface ArticleDeleteInterface {
  sess: string;
  id: number;
}

export const deleteSchema = Joi.object({
  sess: Joi.string().max(512).required(),
  id: Joi.number().integer().min(0).required(),
});
