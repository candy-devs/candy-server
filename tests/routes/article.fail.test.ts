import request from "supertest";
import app from "../../app";
import { ArticleWriteResultCode } from "../../schema/article.schema";
import { createJWT } from "../../auth/jwt/createJWT";

describe("Article Fail Test", () => {
  it("Article Write Anonymous Fail Password Missing", (done) => {
    request(app)
      .post("/api/v1/article")
      .send({ board: 0, title: "test title", body: "test body", type: 0 })
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });

  it("Article Write Fail Type Missing", (done) => {
    request(app)
      .post("/api/v1/article")
      .send({ board: 0, title: "test title", body: "test body", password: 'asdf' })
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });
  
  // type이 1이라면 password는 empty여야함.
  it("Article Write Fail Type Missmatch", (done) => {
    request(app)
      .post("/api/v1/article")
      .send({ board: 0, title: "test title", body: "test body", type: 1, password: 'asdf' })
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });
});
