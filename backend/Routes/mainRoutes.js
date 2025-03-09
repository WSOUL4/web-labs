
import express from 'express';
import {eventsRouter} from "./eventsRouter.js";
import {usersRouter} from "./usersRouter.js";

import {authRouter} from "./auth.js";
import {publicRouter} from "./publicRouter.js";
import {indexRouter} from "./indexRouter.js";


const router = express.Router();
router.use('/events', eventsRouter);
router.use('/users', usersRouter);
router.use('/public',publicRouter);
router.use('/index',indexRouter);
router.use('', authRouter);

export {router};