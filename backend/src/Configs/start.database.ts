import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { Options } from 'sequelize';

dotenv.config();

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbPassword = process.env.DB_PASSWORD as string;
const dbHost = process.env.DB_HOST as string;
const dbPort = parseInt(process.env.DB_PORT as string, 10);

const options: Options = {
  host: dbHost,
  dialect: 'postgres',
  port: dbPort,
};

const conn = new Sequelize(dbName, dbUser, dbPassword, options);

conn
  .authenticate()
  .then(() => {
    console.log('Соединение успешно установлено.');
  })
  .catch((err) => {
    console.error('Не удалось установить соединение:', err);
  });

export { conn };
