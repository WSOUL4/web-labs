import { Sequelize, DataTypes } from 'sequelize';
import {conn} from '../../Database/db_start.js'
const User = conn.define('User', {
    name: DataTypes.STRING,
    email: {type: DataTypes.STRING, unique: true},
    createdAt: DataTypes.DATEONLY,
    id: {type: DataTypes.INTEGER, allowNull: false, unique: true, primaryKey: true},
});
await conn.sync();
export{User}

