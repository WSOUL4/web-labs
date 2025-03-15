import express, { Router } from 'express';
import eventRouter from './event.router';
import usersRouter from './users.router';
import authRouter from './auth.router';

const router: Router = express.Router();

// Setup routes for various endpoints
router.use('/events', eventRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);

export default router;
