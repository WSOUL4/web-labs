import { Sequelize, DataTypes } from 'sequelize';
import {conn} from '../../Database/db_start.js'
const User = conn.define('User', {
    name: DataTypes.STRING,
    email: {type: DataTypes.STRING, unique: true},
    createdAt: DataTypes.DATEONLY,
    id: {type: DataTypes.INTEGER, primaryKey: true},
}, {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,

});
conn.sync()
    .then()
    .catch(err=>{console.log(err);})
export{User}

