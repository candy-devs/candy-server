import { Request } from "express";
import { User } from "../../models/user";
import { LoginInterface } from "../../schema/auth.schema";
import { password2HashedPassword } from "../utils/auth.util";
import { UserLoginInfo } from "./auth.service";
import { createJWT } from "./jwt.service";

export async function tryLoginSession(
  req: Request,
  value: LoginInterface
): Promise<UserLoginInfo | null> {
  const user = await User.findOne({
    where: {
      user_id: value.id,
    },
  });

  if (user === undefined) return null;

  if (user!.password !== password2HashedPassword(value.password)) return null;

  const loginInfo: UserLoginInfo = {
    id: user!.id,
    user_id: value.id,
  };

  req.session.isLogined = true;
  req.session.loginInfo = loginInfo;
  req.session.save();

  return loginInfo;
}

export async function tryLoginJWT(value: LoginInterface): Promise<string | null> {
  const user = await User.findOne({
    where: {
      user_id: value.id,
    },
  });

  if (user === undefined) return null;

  if (user!.password !== password2HashedPassword(value.password)) return null;

  return createJWT(user!.id, value.id);
}
