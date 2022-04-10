import { Session } from "../../models/session";

async function testSessionInit() {
  // await Session.create({
  //   session: 'test-session',
  //   user_id: 1,
  //   expire: Date.now(),
  // });
}

async function testGetSession(): Promise<Session | null> {
  var sess = await Session.findOne({
    where: {
      session: "test-session1",
    }
  });
  return sess;
}

testSessionInit().then(async () => {
  await testGetSession();
});