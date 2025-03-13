import express from 'express';
import {register,login,refreshAccessToken} from '../Controllers/AuthController.js';
import {CheckRegField} from "../Controllers/AuthBeforeCheck.js";


const authRouter = express.Router();

authRouter.post('/register', CheckRegField, register);
authRouter.get('/login', login);
authRouter.post('/refresh', refreshAccessToken);
export default  authRouter;