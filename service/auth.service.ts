// import { publicKey } from "../config/jwtKey";
// import * as jwt from "jsonwebtoken";
// import * as _createSession from "../session/createSession";
// import * as _createJWT from "../auth/jwt/createJWT";
import express, { Request, Response, NextFunction } from "express";

// export function refreshJWT(refreshToken: string) {
//   var decoded = jwt.verify(refreshToken, publicKey);

//   if (
//     typeof decoded === "string" ||
//     decoded.type !== "refresh" ||
//     decoded.accessPayload === undefined ||
//     typeof decoded.accessPayload.user_id !== "number"
//   ) {
//     return null;
//   }

//   return _createJWT.createAccessToken(decoded.accessPayload.user_id);
// }

// export function createJWT(user_id: number): string {
//   return _createJWT.createJWT(user_id);
// }

export function createSession(req: Request) {
  const reqIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  if (typeof reqIp === 'string')
    req.session.clientIp = reqIp;
  req.session.isLogined = false;
  req.session.save();
}

export async function getUserInfoBySession(
  session: string
): Promise<any> {
  // if (session.startsWith("jwt-")) {
  //   return await verifyJWT(session);
  // }

  // var sess = await Session.findOne({
  //   where: { session },
  // });

  // // session not found
  // if (sess === null) return null;

  // // if current session is expired
  // if (sess.expire === null) return null;
  // if (sess.expire!.getUTCMilliseconds() > Date.now()) return null;

  // return sess;
}

// export async function verifyJWT(session: string): Promise<Session | null> {
//   session = session.substring(4);

//   var decoded = jwt.verify(session, publicKey);

//   if (typeof decoded === "string") {
//     return null;
//   }

//   return new Session({ user_id: decoded.user_id });
// }
