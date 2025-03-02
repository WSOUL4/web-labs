import express from 'express'
import {GetAllUsers} from '../Controllers/UserController.js'
//import {router} from "./mainRoutes.js";

const usersRouter = express.Router();
usersRouter.get('/users', GetAllUsers);


export {usersRouter}