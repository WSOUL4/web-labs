import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerJsDoc from 'swagger-jsdoc';
//import swaggerUi from 'swagger-ui-express';
import {swaggerSpec,swaggerUi} from './Configs/Swagger.js';
import logger from 'morgan';
import {conn} from './Database/db_start.js';
import {router} from './Routes/mainRoutes.js';
import {CustomError} from './CustomErrors/errors.js';
import bodyParser from "body-parser";
import {passport} from './Configs/passport.js';

function appServerLaunch(){
    const app = express();
    app.use(cors())//middleware
    app.use(express.json())//middleware
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(passport.initialize());

    dotenv.config()//Для чтения из .env
    const port = process.env.PORT;
    app.listen(port, (error) => {
        if (error) console.error('Не удалось запустить сервер:', error);
        console.info(`Сервер запустился на порте ${port}`);
    });
    return app;
}

let app=appServerLaunch();


app.use(router);
//app.use('/users', usersRouter);
//app.use('/events', eventsRouter);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use((err, req, res, next) => {
    if ( err instanceof CustomError){
        res.status(400).send('Custom err');
    }
});

export {app}
