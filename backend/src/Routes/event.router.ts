import express, { Router } from 'express';
import { apiKeyValidation } from '../Controllers/apiKey.check';
import {
  changeById,
  add,
  deleteById,
  getAll,
  getBetween,
  getById,
  getByMy,
} from '../Controllers/event.controller';
import passport, { strategy } from '../Configs/passport';

const router: Router = express.Router();

// Public Routes
router.get('/id', getById);
router.get('/dates', getBetween);
router.post('/dates', getBetween);
router.get('/', getAll);

// Authenticate using Passport for the following routes
router.use(passport.authenticate(strategy, { session: false }));

// Protected Routes
router.delete('/id', deleteById);
router.put('/id', changeById);
router.post('/', add);
router.get('/my', getByMy);

export default router;
