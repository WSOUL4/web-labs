import express from 'express';
import {register,login} from '../Controllers/AuthController.js';
import {CheckRegField} from "../Controllers/AuthBeforeCheck.js";


const authRouter = express.Router();

authRouter.post('/register', CheckRegField, register);
authRouter.get('/login', login);
export {authRouter}