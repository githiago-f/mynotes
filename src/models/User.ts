import { STRING, UUID, UUIDV4 } from 'sequelize';
import { InitOptions, Model } from 'sequelize';
import { compare } from 'bcrypt';

class User extends Model {
  public static findByEmail(email: string): Promise<User | null> {
    return User.findOne({
      where: {
        email: email
      }
    });
  }

  public validPassword(normalPassword: string) {
    return compare(normalPassword, this.getDataValue('password'))
  }
}
User.init({
  _id: {
    type: UUID,
    defaultValue: UUIDV4
  },
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
