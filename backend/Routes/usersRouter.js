import express from 'express'
import {GetAll,Add} from '../Controllers/UserController.js'
import {CheckRequiredField} from '../Controllers/UserBeforeCheck.js'
import {api_key_vlidation} from '../Controllers/CheckApiKey.js'


const usersRouter = express.Router();

usersRouter.get('' ,api_key_vlidation, GetAll);
usersRouter.post('/',api_key_vlidation,CheckRequiredField, Add);//usersRouter.post('/users/:name/:email/:createdAt/:id', Add);

//,Check


export {usersRouter}