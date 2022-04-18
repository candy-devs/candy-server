import { Article } from "./models/article";

(async function () {
  await Article.sync({force: true});
})();