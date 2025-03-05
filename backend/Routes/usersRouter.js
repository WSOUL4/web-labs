import express from 'express'
import {GetAll,Add} from '../Controllers/UserController.js'
import {CheckRequiredField} from '../Controllers/UserBeforeCheck.js'



const usersRouter = express.Router();

usersRouter.get('' , GetAll);
usersRouter.post('',CheckRequiredField, Add);//usersRouter.post('/users/:name/:email/:createdAt/:id', Add);

//,Check


export {usersRouter}