import express from 'express'

import {GetAll, GetById, Create, ChangeById,DeleteById,GetBetween} from '../Controllers/EventController.js'


const eventsRouter = express.Router();
eventsRouter.delete('/:id', DeleteById);
eventsRouter.put('/:id', ChangeById);
eventsRouter.post('', Create);
eventsRouter.get('/:id', GetById);
eventsRouter.get('/:startDate?/:endDate?', GetBetween);
eventsRouter.get('', GetAll);


export {eventsRouter}