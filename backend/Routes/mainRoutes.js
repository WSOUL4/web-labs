import  Sequelize  from "sequelize";
import {conn} from '../Database/db_start.js'
import express from 'express'
import {GetAllEvents} from "../Controllers/EventController.js";
//import {usersRouter} from './Routes/usersRouter.js'
//import {eventsRouter} from './Routes/eventsRouter.js'


const router = express.Router();
//router.get('/events', GetAllEvents);
//router.use('/users', usersRouter);
//router.use('/events', eventsRouter);
export {router}