import express from 'express'
//import {getParameterByName} from './SharedFuncs.js'
import {Event} from '../Models/Event/event_model.js';

import {conn} from "../Database/db_start.js";
import {ValidationError} from "../CustomErrors/errors.js";
import {isUniqueId} from "../Utilities/Event/utilsE.js";



function CheckRequiredField(req,res,next){

    let id=req.params.id;
    let id_u=isUniqueId(id)
        .then(id_u => {
            if (id_u) {
                // console.log('GOOD');
                next();
            }
            else{
                //throw ValidationError;
                res.status(400).send({message:'Not unique id'})
            }
        })
        .catch(e=>{
            if (e instanceof ValidationError){
                res.status(400).send({message: 'Not unique id'});
        }});


}
export {CheckRequiredField}