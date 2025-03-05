import express from 'express'
import {getParameterByName} from './SharedFuncs.js'
import {Event} from '../Models/Event/event_model.js';

import {conn} from "../Database/db_start.js";
import {ValidationError} from "../CustomErrors/errors.js";
function isIdUniqueId (val) {
    return Event.count({
        where:
            { id: val }
    })
        .then(count => {
            //console.log(count);
            return count === 0;

        })
        .finally(()=>{
            conn.close() // Always close the connection when done
                .then()})

}


function CheckRequiredField(req,res,next){

    let id=getParameterByName('id',req.url);
    let id_u=isIdUniqueId(id)
        .then(id_u => {
            if (id_u) {
                // console.log('GOOD');
            }
            else{
                res.status(400).send({message:'Not unique id'})
            }
        });

    try {
        if ( id){
            next();
        }else{
            //throw ValidationError;
            res.status(400).send({message:'No id, they are required'})
        }
    }catch (e) {
        if (e instanceof ValidationError){
            res.status(400).send({message: 'No id, they are required'});
        }
    }
}
export {CheckRequiredField}