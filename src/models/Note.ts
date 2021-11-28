import { STRING, UUID, UUIDV4 } from 'sequelize';
import { Model } from 'sequelize';
import { sequelize } from 'helpers/sequelize';
import { BOOLEAN } from 'sequelize';

class Note extends Model {
  public readonly _id!: string;
  public readonly title: string;
  public readonly content!: string;
  public readonly visible: boolean;

  constructor() {
    super();
    const self = Object.assign({}, this.get());
    this._id = self._id;
    this.content = self.content;
    this.visible = self.visible;
    this.title = self.title;
  }
}

Note.init({
  _id: {
    type: UUID,
    defaultValue: UUIDV4
  },
  title: {
    type: STRING,
    validate:{
      len: [3, 150],
      notEmpty: true
    }
  },
  content: {
    type: STRING
  },
  visible: {
    type: BOOLEAN,
    defaultValue: true
  }
}, { sequelize });

(async () => await sequelize.sync({ force: true }))();

export { Note };
