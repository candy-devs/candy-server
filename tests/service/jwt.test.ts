import { verifyJWT } from "../../service/session.service";
import { createJWT } from "../../session/createJWT";

it("Create JWT And Verify", () => {
  const jwtId = 123456789;
  const jwtRaw = createJWT(jwtId);

  const jwtParsed = JSON.parse(jwtRaw);

  const jwtAccess = jwtParsed['accessToken'];
  const jwtRefresh = jwtParsed['refreshToken'];

  expect(verifyJWT('jwt-' + jwtAccess)).not.toBeNull();
  expect(verifyJWT('jwt-' + jwtRefresh)).not.toBeNull();
});
