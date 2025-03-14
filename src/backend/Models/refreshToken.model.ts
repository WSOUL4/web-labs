import { DataTypes, Model} from "sequelize";
import { conn } from "../Configs/start.database.js";
import {User} from "./User/user.model";



interface RefreshTokenAttributes {
    id?: number; // Поле id
    user_id: number;
    token: string;
    expires_at: number | undefined;
}

export class RefreshToken extends Model<RefreshTokenAttributes> implements RefreshTokenAttributes {
    public id!: number; // Определяем поле id
    public user_id!: number;
    public token!: string;
    public expires_at!: number | undefined;
}

RefreshToken.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true, // Установка автоинкремента
            primaryKey: true,    // Указание, что это первичный ключ
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false, // Можно сделать поле обязательным
        },
        token: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        expires_at: {
            type: DataTypes.INTEGER,
            allowNull: false, // Сделать поле обязательным
        },
    },
    {
        sequelize: conn,
        modelName: 'RefreshToken',
    }
);

User.hasMany(RefreshToken, {
  foreignKey: "user_id",
});
RefreshToken.belongsTo(User, {
  foreignKey: "user_id",
});
async function syncModels() {
  await RefreshToken.sync({ alter: true }); // Обратите внимание: force: true удалит таблицы перед созданием
  console.log("Tables synced!");
}

syncModels().catch((err) => console.error(err));

