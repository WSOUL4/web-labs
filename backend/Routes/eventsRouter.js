import express from 'express'

import {GetAllEvents} from '../Controllers/EventController.js'
import {usersRouter} from "./usersRouter.js";
//import {router} from "./mainRoutes.js";
const eventsRouter = express.Router();


eventsRouter.get('/events', GetAllEvents);

export {eventsRouter}