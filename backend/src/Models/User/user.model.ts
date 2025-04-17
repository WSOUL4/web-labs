import { Model, DataTypes, Sequelize } from 'sequelize';
import { conn } from '../../Configs/start.database';
import {Event} from '../Event/event.model';
import { RefreshToken } from '../refreshToken.model';
import bcrypt from 'bcryptjs';

export interface UserAttributes {
  id?: number; // Поле id
  name?: string;
  surname?: string;
  fname?: string;
  gender?: string;
  birthday?: string;
  email: string;
  password: string;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number; // Определяем поле id
  public name!: string;
  public surname!: string;
  public fname!: string;
  public gender!: string;
  public birthday!: string;
  public email!: string;
  public password!: string;


}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // Установка автоинкремента
      primaryKey: true, // Указание, что это первичный ключ
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true, // Можно сделать поле обязательным
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: true, // Можно сделать поле обязательным
    },
    fname: {
      type: DataTypes.STRING,
      allowNull: true, // Можно сделать поле обязательным
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true, // Можно сделать поле обязательным
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // Сделать поле обязательным
    },
  },
  {
    sequelize: conn,
    modelName: 'User',
  },
);
User.hasMany(Event, {
  foreignKey: 'createdBy',
});
User.hasMany(RefreshToken, {
  foreignKey: 'user_id',
});
RefreshToken.belongsTo(User, {
  foreignKey: 'user_id',
});
Event.belongsTo(User, {
  foreignKey: 'createdBy',
});
User.beforeCreate(async (user: User) => {
  console.log('BeforeCreate hook triggered');
  //console.log(user);
  const userData: UserAttributes = user.get();
  const salt = await bcrypt.genSalt(10);
  userData.password = await bcrypt.hash(userData.password, salt);
  console.log('Password hashed');
});

async function syncModels() {
  await User.sync({ alter: true }); // alter не удалит таблицы
  await Event.sync({ alter: true });
  await RefreshToken.sync({ alter: true }); 
  console.log('Tables synced!');
}

syncModels().catch((err) => console.error(err));
//export { UserAttributes };
