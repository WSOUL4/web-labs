import { Model, DataTypes, ForeignKey } from "sequelize";
import { conn } from "../../Configs/start.database";
import { User } from "../User/user.model";

interface EventAttributes {
    id?: number; // Поле id
    title: string;
    description: string;
    date: string; // Или Date, если вы хотите использовать Date
    createdBy: ForeignKey<User['id']>; // Внешний ключ
}

export class Event extends Model<EventAttributes> implements EventAttributes {
    public id!: number; // Определяем поле id
    public title!: string;
    public description!: string;
    public date!: string; // Или Date
    public createdBy!: ForeignKey<User['id']>; // Внешний ключ
}

Event.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true, // Установка автоинкремента
            primaryKey: true,    // Указание, что это первичный ключ
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
            references: {
                model: User,
                key: 'id',
            },
        },
    },
    {
        sequelize: conn,
        modelName: "Event",
    }
);

User.hasMany(Event, {
    foreignKey: "createdBy",
});
Event.belongsTo(User, {
    foreignKey: "createdBy",
});

async function syncModels() {
    await Event.sync({ alter: true });
    console.log("Tables synced!");
}

syncModels().catch((err) => console.error(err));
