import { Session, WebToken } from "../models/session";

export async function createSession(user_id: number) {
  var sess = await Session.create({
    session: '',
    user_id: user_id,
    expire: Date.now() + 1000,
  });
}

export async function getSession(session: string): Promise<Session | null> {
  if (session.startsWith('wt'))
    return await verifySession(session);

  var sess = await Session.findOne({
    where: { session },
  });

  // session not found
  if (sess === null) return null;

  // if current session is expired
  if (sess.expire > Date.now()) return null;

  return sess;
}

export async function verifySession(session: string): Promise<WebToken | null> {
  return null;
}
