import { verifyJWT } from "../../service/session.service";
import { createJWT } from "../../session/createJWT";

it("Create JWT And Verify", () => {
  const jwtId = 123456789;
  const jwtRaw = createJWT(jwtId);
  const jwtAccess = JSON.parse(jwtRaw)['accessToken'];

  expect(verifyJWT('jwt-' + jwtAccess)).not.toBeNull();
});
