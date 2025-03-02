import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config()
const conn = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT
});

conn.authenticate()
    .then(() => {
        console.log('Соединение успешно установлено.');
    })
    .catch(err => {
        console.error('Не удалось установить соединение:', err);
    });

export {conn};

