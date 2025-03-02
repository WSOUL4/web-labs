import { Sequelize, DataTypes } from 'sequelize';
import {conn} from '../../Database/db_start.js'
const User = conn.define('User', {
    name: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true},
    createdAt: DataTypes.DATE,
    id: {type: DataTypes.INTEGER, allowNull: false, unique: true},
});
await conn.sync();
export{User}

