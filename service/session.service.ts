import { Session } from "../models/session";

export async function createSession(user_id: number) {

}

export async function getSession(session: string): Promise<Session | null> {
  var sess = await Session.findOne({
    where: { session },
  });

  // session not found
  if (sess === null) return null;

  // if current session is expired
  if (sess.expire > Date.now()) return null;

  return sess;
}
