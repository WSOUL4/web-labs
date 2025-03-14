import { Model, DataTypes, Sequelize } from "sequelize";
import { conn } from "../../Configs/start.database";
import bcrypt from "bcryptjs";

interface UserAttributes {
    id?: number; // Поле id
    name: string;
    email: string;
    password: string;
}

export class User extends Model<UserAttributes> implements UserAttributes {
    public id!: number; // Определяем поле id
    public name!: string;
    public email!: string;
    public password!: string;

    // Опционально, можете добавить дополнительные методы класса, если нужно
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true, // Установка автоинкремента
            primaryKey: true,    // Указание, что это первичный ключ
        },
        name: {
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
    }
);

User.beforeCreate(async (user: User) => {
    console.log("BeforeCreate hook triggered");
    user.password = await bcrypt.hash(user.password, 10);
    console.log("Password hashed");
});

async function syncModels() {
    await User.sync({ alter: true }); // alter не удалит таблицы
    console.log("Tables synced!");
}

syncModels().catch((err) => console.error(err));
