import { Session } from "../models/session";
import { publicKey } from "../config/jwtKey";
import * as jwt from "jsonwebtoken";
import * as _createSession from "../session/createSession";
import * as _createJWT from "../session/createJWT";

export async function createSession(user_id: number): Promise<string | null> {
  var expire = Date.now() + 60000 * 60;

  var sess = await Session.create({
    session: _createSession.createSession(user_id, expire),
    user_id: user_id,
    expire: Date.now() + 60000 * 60,
  });

  return sess.session!;
}

export async function refershSession(user_id: number) {
  await Session.update(
    { expire: Date.now() + 60000 * 60 },
    { where: { user_id: user_id } }
  );
}

export function refreshJWT(refreshToken: string) {
  
}

export function createJWT(user_id: number): string {
  return _createJWT.createJWT(user_id);
}

export async function getUserInfoBySession(
  session: string
): Promise<Session | null> {
  if (session.startsWith("jwt-")) {
    return await verifyJWT(session);
  }

  var sess = await Session.findOne({
    where: { session },
  });

  // session not found
  if (sess === null) return null;

  // if current session is expired
  if (sess.expire === null) return null;
  if (sess.expire! > Date.now()) return null;

  return sess;
}

export async function verifyJWT(
  session: string
): Promise<Session | null> {
  session = session.substring(4);

  var decoded = jwt.verify(session, publicKey);

  if (typeof decoded === "string") {
    return null;
  }

  return new Session({ user_id: decoded.user_id });
}
