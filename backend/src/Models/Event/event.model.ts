import { Model, DataTypes } from 'sequelize';
import { conn } from '../../Configs/start.database';
import { User } from '../User/user.model';

export interface EventAttributes {
  id?: number; // Поле id
  title: string;
  description: string;
  date: string; // Или Date, если вы хотите использовать Date
  createdBy: number; // Внешний ключ
  location: string;
}

export class Event extends Model<EventAttributes> implements EventAttributes {
  public id!: number; // Определяем поле id
  public title!: string;
  public description!: string;
  public date!: string; // Или Date
  public createdBy!: number; // Внешний ключ
  public location!: string; // Или Date
}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // Установка автоинкремента
      primaryKey: true, // Указание, что это первичный ключ
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      /*references: {
        model: User,
        key: 'id',
      },*/
    },
    location: {
          type: DataTypes.STRING,
          allowNull: true,
        },
  },
  {
    sequelize: conn,
    modelName: 'Event',
  },
);


/*

async function syncModels() {
  await Event.sync({ force: true });
  console.log('Tables synced!');
}

syncModels().catch((err) => console.error(err));
//export { EventAttributes };*/
