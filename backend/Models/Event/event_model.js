import { Sequelize, DataTypes } from 'sequelize';
import {conn} from '../../Database/db_start.js'
const Event = conn.define('Event', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    createdBy: {type: DataTypes.INTEGER, foreignKey: true},
    id: {type: DataTypes.INTEGER, allowNull: false, unique: true, primaryKey: true},
});
await conn.sync();

export {Event}


