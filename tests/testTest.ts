// import "jest";
// import "cahi";
// import "sinon";
import { expect } from "chai";
import { sequelize } from "../models";
import { Article } from "../models/article";
import { Session } from "../models/session";
import { User } from "../models/user";

// describe("test", () => {
//   test("test", (done) => {
//     // it("test", () => {
//     //     expect("1").to.equal("1");
//     // });

//     // expect();
//     done();
//   });
// });

interface login {
    func(this: login, username: string, password: string): string;
    userid: string;
}

let loginUser : login = {} as login;
loginUser.func = function(this, id: string, pw: string) {
    this.userid = "asdf";
    return "str";
}

async function run(): Promise<void> {
//  await  sequelize.drop();
  // await User.sync({ force: true, });
  // await Article.sync({ force: true, });
  await Session.sync();

  // User.create({
  //   user_id: "testid",
  //   password: "testpw",
  //   user_name: "testname",
  //   permission: 0,
  // }).then(() => console.log("Data is created!"));
}

run();