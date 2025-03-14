import { Model, DataTypes } from "sequelize";
import { conn } from "../../Configs/start.database";
import { User } from "../User/user.model";

interface EventAttributes {
    title: string;
    description: string;
    date: string; // Можно использовать Date, если хотите хранить как тип Date
    createdBy: number;
}

export class Event extends Model<EventAttributes> implements EventAttributes {
    public title!: string;
    public description!: string;
    public date!: string; // Можно использовать Date
    public createdBy!: number;
}

Event.init(
    {
        title: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        date: {
            type: DataTypes.DATEONLY,
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false, // Сделать поле обязательным
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
    await Event.sync({ alter: true }); // alter не удалит таблицы
    console.log("Tables synced!");
}

syncModels().catch((err) => console.error(err));
