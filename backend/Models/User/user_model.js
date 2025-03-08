import { Sequelize, DataTypes } from 'sequelize';
import {conn} from '../../Database/db_start.js';
import bcrypt from 'bcryptjs';
const User = conn.define('User', {
    name: DataTypes.STRING,
    email: {type: DataTypes.STRING, unique: true},
    password: DataTypes.STRING,
    createdAt: DataTypes.DATEONLY,
    id: {type: DataTypes.INTEGER, primaryKey: true},
}, {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,


});
User.beforeCreate(async (user)=>{
    console.log('BeforeCreate hook triggered');
    user.password= await bcrypt.hash(user.password,10);
    console.log('Password hashed');
});
async function syncModels() {
    await User.sync({ alter: true }); // Обратите внимание: force: true удалит таблицы перед созданием
    console.log("Tables synced!");
}

syncModels().catch(err => console.error(err));
export{User}

