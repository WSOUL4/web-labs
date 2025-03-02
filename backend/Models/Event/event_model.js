import { Sequelize, DataTypes } from 'sequelize';
import {conn} from '../../Database/db_start.js'
const Event = conn.define('Event', {
    title: {type: DataTypes.STRING, allowNull: false, unique: false},
    description: DataTypes.STRING,
    date: DataTypes.DATE,
    createdBy: {type: DataTypes.INTEGER, unique: false},
    id: {type: DataTypes.INTEGER, allowNull: false, unique: true},
});
await conn.sync();

export {Event}


