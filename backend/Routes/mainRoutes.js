import  Sequelize  from "sequelize";
import {conn} from '../Database/db_start.js'
import express from 'express'
//import {api_key_vlidation} from '../Controllers/CheckApiKey.js'


const router = express.Router();
//router.use('/',api_key_vlidation);
export {router}