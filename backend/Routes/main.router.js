import express from 'express';
import eventRouter from "./event.router.js";
import usersRouter from "./users.router.js";
import authRouter from "./auth.router.js";


const router = express.Router();
router.use('/events', eventRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);

export default router;