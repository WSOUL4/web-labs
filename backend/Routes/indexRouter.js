import express from 'express';
import {authRouter} from "./authRouter.js";
import {passport,strategy} from '../Configs/passport.js';
import {GetAll, GetById, Create, ChangeById,DeleteById,GetBetween} from '../Controllers/EventController.js';
const indexRouter = express.Router();

indexRouter.use(passport.authenticate(strategy,{session:false}));
indexRouter.get('/events', GetAll);

export {indexRouter};