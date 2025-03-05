import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import logger from 'morgan'
import {conn} from './Database/db_start.js'
import {router} from './Routes/mainRoutes.js'
import {usersRouter} from './Routes/usersRouter.js'
import {eventsRouter} from './Routes/eventsRouter.js'
function appServerLaunch(){
    const app = express();
    app.use(cors())//middleware
    app.use(express.json())//middleware
    app.use(logger('dev'));
    //app.use(bodyParser.json());


    dotenv.config()//Для чтения из .env
    const port = process.env.PORT;
    app.listen(port, (error) => {
        if (error) console.error('Не удалось запустить сервер:', error);
        console.info(`Сервер запустился на порте ${port}`);
    });
    return app;
}

let app=appServerLaunch();

app.use('/events',eventsRouter);
app.use('/users',usersRouter);
app.use(router);


export {app}
