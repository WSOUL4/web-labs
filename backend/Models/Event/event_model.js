import { Sequelize, DataTypes } from 'sequelize';
import {conn} from '../../Database/db_start.js'
const Event = conn.define('Event', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    createdBy: {type: DataTypes.INTEGER},//, foreignKey: true
    id: {type: DataTypes.INTEGER, primaryKey: true},
}, {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,

});
conn.sync()
    .then()
    .catch(err=>{console.log(err);})

export {Event}


