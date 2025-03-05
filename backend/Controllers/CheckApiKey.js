import express from 'express'
import {ValidationError,NotFoundError} from '../CustomErrors/errors.js'
import dotenv from 'dotenv'
function api_key_vlidation(req,res,next){
    let headers = req.headers;
    const key = process.env.API_KEY;
    if (key===headers.api_key){
        next();

    } else {
        //throw ValidationError;
        res.status(401).send({message:'Wrong api-key'})

    }


}
export {api_key_vlidation}