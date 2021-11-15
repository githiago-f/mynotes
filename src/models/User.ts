import { STRING } from "sequelize";
import { InitOptions, Model } from "sequelize";

class User extends Model {
}
User.init({
  name: {
    type: STRING
  },
  email: {
    type: STRING
  },
  password: {
    type: STRING
  }
}, {} as InitOptions<User>);

export { User };
