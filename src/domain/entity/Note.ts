import { DATE, STRING, UUID, UUIDV4, BOOLEAN, Model } from 'sequelize';
import { sequelize } from 'helpers/sequelize';

class Note extends Model {
  public readonly _id!: string;
  public readonly title: string;
  public readonly content!: string;
  public readonly createdAt: Date;
  public readonly visible: boolean;

  constructor() {
    super();
    const self = Object.assign({}, this.get());
    this._id = self._id;
    this.content = self.content;
    this.visible = self.visible;
    this.title = self.title;
    this.createdAt = self.date;
  }
}

Note.init({
  _id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
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
  },
  createdAt: {
    type: DATE,
    defaultValue: sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
  },
  author: {
    type: UUID,
    defaultValue: UUIDV4,
    references: {
      model: 'Users',
      key: '_id'
    }
  }
}, { sequelize });

(async () => await sequelize.sync({ force: true }))();

export { Note };
