// import "jest";
// import "cahi";
// import "sinon";
import { expect } from "chai";
import { UserModelStatic } from "../models/user";

const models = require("./../models");

// describe("test", () => {
//   test("test", (done) => {
//     // it("test", () => {
//     //     expect("1").to.equal("1");
//     // });

//     // expect();
//     done();
//   });
// });

(<UserModelStatic>models.User)
  .create({
    user_name: "Test",
  })
  .then(() => console.log("Data is created!"));
