import express from 'express';
import {register} from '../Controllers/AuthController.js';


const authRouter = express.Router();

authRouter.post('', register);
export {authRouter}