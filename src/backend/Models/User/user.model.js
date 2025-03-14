import { Sequelize, DataTypes } from "sequelize";
import { conn } from "../../Configs/start.database.js";
import bcrypt from "bcryptjs";
const User = conn.define(
  "User",
  {
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: DataTypes.STRING,
    //createdAt: DataTypes.DATEONLY,///now()::date
    //id: {type: DataTypes.INTEGER, primaryKey: true},//nextval('"Users_id_seq"'::regclass)
  },
  {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: true,
  },
);
User.beforeCreate(async (user) => {
  console.log("BeforeCreate hook triggered");
  user.password = await bcrypt.hash(user.password, 10);
  console.log("Password hashed");
});
async function syncModels() {
  await User.sync({ alter: true }); // Обратите внимание:alter, force: true удалит таблицы перед созданием
  console.log("Tables synced!");
}

syncModels().catch((err) => console.error(err));
export { User };
