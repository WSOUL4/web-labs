import express from 'express';
import {getAll,add} from '../Controllers/UserController.js';
import {CheckRequiredField} from '../Controllers/UserBeforeCheck.js';
import {apiKeyValidation} from '../Controllers/CheckApiKey.js';

const usersRouter = express.Router();
usersRouter.get('' ,apiKeyValidation, getAll);
usersRouter.post('/',apiKeyValidation,CheckRequiredField, add);//usersRouter.post('/users/:name/:email/:createdAt/:id', Add);
export default usersRouter;