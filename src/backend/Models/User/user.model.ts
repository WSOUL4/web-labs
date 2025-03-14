import { Model, DataTypes, Sequelize } from "sequelize";
import { conn } from "../../Configs/start.database";
import bcrypt from "bcryptjs";

interface UserAttributes {
    name: string;
    email: string;
    password: string;
}

export class User extends Model<UserAttributes> implements UserAttributes {
    public name!: string;
    public email!: string;
    public password!: string;

    // Опционально, можете добавить дополнительные методы класса, если нужно
}

User.init(
    {
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
        sequelize: conn, // Изменено с `conn` на `sequelize`
        modelName: 'User', // Изменено с 'Event' на 'User'
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
