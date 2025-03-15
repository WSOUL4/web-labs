import express from 'express';
import {
  register,
  login,
  refreshAccessToken,
} from '../Controllers/auth.controller';
import { checkRegField } from '../Controllers/auth.prepare'; // Corrected the import name

const authRouter = express.Router();

// Define the routes
authRouter.post('/register', checkRegField, register);
authRouter.get('/login', login);
authRouter.post('/refresh', refreshAccessToken);

// Export the router
export default authRouter;
