import { Sequelize, DataTypes } from 'sequelize';
import { conn } from '../Configs/start.database.js';
import { User } from './User/user.model.js';

const RefreshToken = conn.define(
  'RefreshToken',
  {
    user_id: DataTypes.INTEGER,
    token: DataTypes.STRING,
    expires_at: DataTypes.INTEGER,
  },
  {
    timestamps: false,
  },
);
User.hasMany(RefreshToken, {
  foreignKey: 'user_id',
});
RefreshToken.belongsTo(User, {
  foreignKey: 'user_id',
});
async function syncModels() {
  await RefreshToken.sync({ alter: true }); // Обратите внимание: force: true удалит таблицы перед созданием
  console.log('Tables synced!');
}

syncModels().catch((err) => console.error(err));
export { RefreshToken };
