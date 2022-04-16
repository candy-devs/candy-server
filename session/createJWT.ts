import { access } from "fs";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { privateKey } from "../config/jwtKey";

export function createJWT(user_id: number): string {
  const accessPayload = {
    user_id: user_id,
    type: 'access',
  };

  const refreshPayload = {
    accessPayload: accessPayload,
    type:'refresh',
  };

  const refreshTokenOptions: jwt.SignOptions = {
    algorithm: "RS256",
    expiresIn: "14d",
    issuer: config.issuer,
  };

  const accessTokenOptions: jwt.SignOptions = {
    algorithm: "RS256",
    expiresIn: "2h",
    issuer: config.issuer,
  };

  const refreshToken = jwt.sign(accessPayload, privateKey, refreshTokenOptions);
  const accessToken = jwt.sign(refreshPayload, privateKey, accessTokenOptions);

  return JSON.stringify({
    refreshToken: refreshToken,
    accessToken: accessToken,
  })
}
