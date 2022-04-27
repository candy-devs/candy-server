import * as jwt from "jsonwebtoken";
import * as _createJWT from "../../auth/jwt/createJWT";
import { publicKey } from "../../config/jwtKey";
import { UserLoginInfo } from "./auth.service";

export function refreshJWT(refreshToken: string) {
  var decoded = jwt.verify(refreshToken, publicKey);

  if (
    typeof decoded === "string" ||
    decoded.type !== "refresh" ||
    decoded.accessPayload === undefined ||
    typeof decoded.accessPayload.id !== "number" ||
    typeof decoded.accessPayload.user_id !== "string"
  ) {
    return null;
  }

  return _createJWT.createAccessToken(
    decoded.accessPayload.id,
    decoded.accessPayload.user_id
  );
}

export function createJWT(id: number, user_id: string): string {
  return _createJWT.createJWT(id, user_id);
}

export function verifyJWT(
  token: string
): UserLoginInfo | null {
  var decoded = jwt.verify(token, publicKey);

  if (typeof decoded === "string") {
    return null;
  }

  return { id: decoded.id, user_id: decoded.user_id };
}
