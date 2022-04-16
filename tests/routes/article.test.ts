import request from "supertest";
import app from "../../app";
import { createJWT } from "../../session/createJWT";

describe("Article Test", () => {
  it("Article Write", (done) => {
    const testUserId = 1;

    const jwtRaw = createJWT(testUserId);
    const jwtParsed = JSON.parse(jwtRaw);
    const jwtAccess = jwtParsed['accessToken'];

    request(app)
      .post("/api/v1/article/write")
      .send({ sess: "jwt-" + jwtAccess, board: 0, title: "test title", body: "test body" })
      .then((res) => {
        console.log(res.body);

        expect(res.statusCode).toEqual(200);
        done();
      });
  });
});
