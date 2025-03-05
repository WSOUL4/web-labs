import express from 'express'
import {GetAll,Add} from '../Controllers/UserController.js'




const usersRouter = express.Router();

usersRouter.get('', GetAll);
usersRouter.post('', Add);//usersRouter.post('/users/:name/:email/:createdAt/:id', Add);




export {usersRouter}