import express from "express";
//import {getParameterByName} from './SharedFuncs.js'
import { Event } from "../Models/Event/event.model.js";

import { conn } from "../Configs/start.database.js";
import { ValidationError } from "../CustomErrors/errors.js";
import { isUniqueId } from "../Utilities/Event/event.utils.js";

function checkRequiredField(req, res, next) {
  let id = req.body.id;
  isUniqueId(id)
    .then((isIdUni) => {
      if (isIdUni) {
        // console.log('GOOD');
        next();
      } else {
        //throw ValidationError;
        res.status(400).send({ message: "Not unique id" });
      }
    })
    .catch((e) => {
      res.status(400).send({ message: "Not unique id" });
    });
}
export { checkRequiredField };
