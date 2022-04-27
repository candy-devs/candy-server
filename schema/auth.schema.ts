import Joi from "joi";

export enum SigninResultCode {
  success = 0,
  alreayExistsIdOrName = -1,
  passwordFormatIncorrect = -2,
  userIdOrNameFormatIncorrect = -3,
}

export interface SigninInterface {
  id: string;
  password: string;
  nickname: string;
}

export const signinSchema = Joi.object({
  id: Joi.string().min(6).max(64).required(),
  password: Joi.string().min(9).max(256).required(),
  nickname: Joi.string().min(4).max(24).required(),
});
