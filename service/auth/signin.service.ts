import { User } from "../../models/user";
import { SigninInterface, SigninResultCode } from "../../schema/auth.schema";
import { Op } from "sequelize";
import {
  checkCorrectIdFormat,
  checkCorrectNicknameFormat,
  checkCorrectPasswordFormat,
  password2HashedPassword,
} from "../utils/auth.util";

async function checkUserExists(value: SigninInterface): Promise<boolean> {
  const cnt = await User.count({
    where: {
      [Op.or]: [{ user_id: value.id }, { user_name: value.nickname }],
    },
  });
  return cnt > 0;
}

export async function trySignin(
  value: SigninInterface
): Promise<SigninResultCode> {
  // 1. 아이디 또는 닉네임이 존재하는지 확인
  if (await checkUserExists(value))
    return SigninResultCode.alreayExistsIdOrName;

  // 2. 아이디, 닉네임 형식이 일치하는지 확인
  if (
    !checkCorrectIdFormat(value.id) ||
    !checkCorrectNicknameFormat(value.nickname)
  )
    return SigninResultCode.userIdOrNameFormatIncorrect;

  // 3. 비밀번호 형식이 일치하는지 확인
  if (!checkCorrectPasswordFormat(value.password))
    return SigninResultCode.passwordFormatIncorrect;

  // 4. 가입승인
  const hpw = password2HashedPassword(value.password);
  await User.create({
    user_name: value.nickname,
    user_id: value.id,
    password: hpw,
    permission: 0,
  });

  return 0;
}
