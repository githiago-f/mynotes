import { STRING, UUID, UUIDV4 } from 'sequelize';
import { Model } from 'sequelize';
import { compare } from 'bcrypt';
import { sequelize } from 'helpers/sequelize';

class User extends Model {
  public _id!: string;
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

  public toJSON() {
    const copy = Object.assign({}, this.get());
    delete copy.password;
    return copy;
  }
}
User.init({
  _id: {
    type: UUID,
    unique: true,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING
  },
  email: {
    type: STRING,
    unique: true
  },
  password: {
    type: STRING
  }
}, { sequelize });

(async () => await sequelize.sync({ force: true }))();

export { User };
