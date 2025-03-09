
import express from 'express';
import {eventsRouter} from "./eventsRouter.js";
import {usersRouter} from "./usersRouter.js";

import {authRouter} from "./auth.js";


const router = express.Router();
router.use('/events', eventsRouter);
router.use('/users', usersRouter);
router.use('/register', authRouter);

export {router};