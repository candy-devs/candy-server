import { createJWT } from "../../auth/jwt/createJWT";
import { SigninInterface } from "../../schema/auth.schema";
import { trySignin } from "../../service/signin.service";

describe("SignIn Test", () => {
  it("Try Signin Test", async () => {
    const param: SigninInterface = {
      id: "testid1",
      password: "testpassword123",
      nickname: "testnickname",
    };

    expect(await trySignin(param)).toEqual(0);
  });
});
