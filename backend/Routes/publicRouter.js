import express from 'express';
//import {api_key_vlidation} from "../Controllers/CheckApiKey.js";
import {GetAll} from "../Controllers/EventController.js";
const publicRouter = express.Router();
publicRouter.get('/events', GetAll);
export {publicRouter}