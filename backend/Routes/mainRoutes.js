
import express from 'express';
import {eventsRouter} from "./eventsRouter.js";
import {usersRouter} from "./usersRouter.js";




const router = express.Router();
router.use('/events', eventsRouter);
router.use('/users', usersRouter);


export {router};