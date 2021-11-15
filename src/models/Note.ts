import { STRING, UUID, UUIDV4 } from 'sequelize';
import { Model } from 'sequelize';
import { sequelize } from 'helpers/sequelize';

class Note extends Model {
}
Note.init({
  _id: {
    type: UUID,
    defaultValue: UUIDV4
  }
}, { sequelize });

(async () => await sequelize.sync({ force: true }))();

export { Note };
