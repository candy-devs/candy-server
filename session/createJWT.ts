import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { privateKey } from "../config/jwtKey";

export function createJWT(user_id: number): string {
  const payload = {
    id: user_id,
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

  const refreshToken = jwt.sign(payload, privateKey, refreshTokenOptions);
  const accessToken = jwt.sign(payload, privateKey, accessTokenOptions);

  return JSON.stringify({
    refreshToken: refreshToken,
    accessToken: accessToken,
  })
}
