import { Session } from "../../models/session";
import { User } from "../../models/user";
import {
  createSession,
  getUserInfoBySession,
  verifyJWT,
} from "../../service/session.service";
import { createJWT } from "../../session/createJWT";

describe("Session Test", () => {
  it("Create JWT And Verify", () => {
    const jwtId = 123456789;
    const jwtRaw = createJWT(jwtId);

    const jwtParsed = JSON.parse(jwtRaw);

    const jwtAccess = jwtParsed["accessToken"];
    const jwtRefresh = jwtParsed["refreshToken"];

    expect(verifyJWT("jwt-" + jwtAccess)).not.toBeNull();
    expect(verifyJWT("jwt-" + jwtRefresh)).not.toBeNull();
  });

  it("Create Session And Verify", async () => {
    const user = await User.create({
      user_id: "testid",
      user_name: "testname",
      password: "testpw",
      permission: 0,
    });

    const sess = await createSession(user.id).catch((e) => console.log(e));
    expect(sess).not.toBeNull();

    const userInfo = await getUserInfoBySession(sess!).catch((e) =>
      console.log(e)
    );
    expect(userInfo).not.toBeNull();

    expect(userInfo!.user_id).toBe(user.id);
  });
});
