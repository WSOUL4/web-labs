import express from 'express'
import {api_key_vlidation} from '../Controllers/CheckApiKey.js'
import {GetAll, GetById, Create, ChangeById,DeleteById,GetBetween} from '../Controllers/EventController.js'
import {CheckRequiredField} from "../Controllers/UserBeforeCheck.js";


const eventsRouter = express.Router();
eventsRouter.delete('/:id',api_key_vlidation, DeleteById);
eventsRouter.put('/:title?/:description?/:date?/:createdBy?/:id?',api_key_vlidation, ChangeById);
eventsRouter.post('/:title?/:description?/:date?/:createdBy?/:id?',api_key_vlidation,CheckRequiredField, Create);
eventsRouter.get('/:id',api_key_vlidation, GetById);
eventsRouter.get('/:startDate?/:endDate?',api_key_vlidation, GetBetween);
eventsRouter.get('',api_key_vlidation, GetAll);


export {eventsRouter}