
import { Model, BuildOptions } from "sequelize";

// sequelize model:generate --name User --attributes user_id:string,user_name:string,password:string,permission:integer
interface UserModel extends Model {
  readonly id: number;
  readonly user_id: string;
  readonly password: string;
  readonly permission: number;
}

type UserModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel;
}
