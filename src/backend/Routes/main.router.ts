import express, { Router } from 'express';
import eventRouter from '@routers/event.router';
import usersRouter from '@routers/users.router';
import authRouter from '@routers/auth.router';

const router: Router = express.Router();

// Setup routes for various endpoints
router.use('/events', eventRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);

export default router;
