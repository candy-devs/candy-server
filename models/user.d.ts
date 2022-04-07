
import { Model, BuildOptions } from "sequelize";

// sequelize model:generate --name User --attributes user_id:string,user_name:string,password:string,permission:integer
// https://pjt3591oo.github.io/sequelizejs_translate/build/html/OtherTopics/TypeScript.html
interface UserModel extends Model {
  readonly id: number;
  readonly user_id: string;
  readonly user_name: string;
  readonly password: string;
  readonly permission: number;
}

type UserModelOptional = {
  id: number,
  user_id: string,
  user_name: string,
  password: string,
  permission: number,
};

type UserModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel;
}
