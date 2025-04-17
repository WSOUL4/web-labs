import { Sequelize, DataTypes } from 'sequelize';
import { conn } from '../../Configs/start.database.js';
import { User } from '../User/user.model.js';
const Event = conn.define(
  'Event',
  {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    createdBy: { type: DataTypes.INTEGER, foreignKey: true }, //, foreignKey: true
    //id: {type: DataTypes.INTEGER, primaryKey: true},
  },
  {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  },
);
User.hasMany(Event, {
  foreignKey: 'createdBy',
});
Event.belongsTo(User, {
  foreignKey: 'createdBy',
});
async function syncModels() {
  await Event.sync({ alter: true }); // Обратите внимание: force: true удалит таблицы перед созданием
  console.log('Tables synced!');
}

syncModels().catch((err) => console.error(err));

export { Event };
