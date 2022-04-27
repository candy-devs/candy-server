import request from "supertest";
import app from "../../app";
import { createJWT } from "../../auth/jwt/createJWT";

describe("Article Test", () => {
  it("Article Write Anonymous", (done) => {
    request(app)
      .post("/api/v1/article")
      .send({ board: 0, title: "test title", body: "test body", type: 0, password: 'testpass' })
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });

  it("Article Write Logined JWT", (done) => {
    const testUserId = 1;

    const jwtRaw = createJWT(testUserId);
    const jwtParsed = JSON.parse(jwtRaw);
    const jwtAccess = jwtParsed['accessToken'];

    request(app)
      .post("/api/v1/article")
      .send({ sess: "jwt-" + jwtAccess, board: 0, title: "test title", body: "test body", type: 1 })
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });

  it("Article Delete Logined JWT", (done) => {
    const testUserId = 1;

    const jwtRaw = createJWT(testUserId);
    const jwtParsed = JSON.parse(jwtRaw);
    const jwtAccess = jwtParsed['accessToken'];

    request(app)
      .delete("/api/v1/article")
      .send({ sess: "jwt-" + jwtAccess, id: 6, })
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });
});
