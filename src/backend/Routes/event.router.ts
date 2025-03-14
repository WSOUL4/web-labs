import express, { Router } from 'express';
import { apiKeyValidation } from '@controllers/apiKey.check';
import {
  changeById,
  add,
  deleteById,
  getAll,
  getBetween,
  getById,
  getByMy,
} from '@controllers/event.controller';
import passport, { strategy } from '@configs/passport';

const router: Router = express.Router();

// Public Routes
router.get('/id', apiKeyValidation, getById);
router.get('/dates', apiKeyValidation, getBetween);
router.get('/', apiKeyValidation, getAll);

// Authenticate using Passport for the following routes
router.use(passport.authenticate(strategy, { session: false }));

// Protected Routes
router.delete('/id', apiKeyValidation, deleteById);
router.put('/id', apiKeyValidation, changeById);
router.post('/', apiKeyValidation, add);
router.get('/my', getByMy);

export default router;
