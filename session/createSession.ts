

import * as crypto from "crypto";
import { config } from "../config/config";

export function createSession(user_id: number, expire: number): string {
  let mac = crypto.createHash('sha512');
  let hmac = mac.update(`${config.saltwebtokenv1}/${user_id}/${expire}`);
  let hash = hmac.digest('hex');

  return hash;
}