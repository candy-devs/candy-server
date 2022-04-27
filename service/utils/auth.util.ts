
import * as crypto from "crypto";
import { config } from "../../config/config";

export function checkCorrectPasswordFormat(pw: string): boolean {
  // 숫자 하나 이상
  // 문자 하나 이상
  // 9자 이상, 256자 이하
  const re = new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{9,256})");
  return re.test(pw);
}

export function checkCorrectIdFormat(id: string): boolean {
  const re = new RegExp("^\\w{6,64}");
  return re.test(id);
}

export function checkCorrectNicknameFormat(nick: string): boolean {
  return true;
}

export function password2HashedPassword(pw: string): string {
  return crypto
    .createHash("sha256")
    .update(pw + config.saltuserpassword)
    .digest("hex");
}
