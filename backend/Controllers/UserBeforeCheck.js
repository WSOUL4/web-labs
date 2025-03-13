import express from 'express'
//import {getParameterByName} from './SharedFuncs.js'
import {ValErr} from "../CustomErrors/errors.js";
import {User} from '../Models/User/user_model.js'
import {conn} from "../Configs/db_start.js";
import {isUniqueEmail, isUniqueId} from "../Utilities/Users/utilsU.js";


function CheckRequiredField(req,res,next){
    //console.log(req.body);
    let email=req.body.email;

    let id=req.body.id;
    //console.log(id);
    let id_u=isUniqueId(id)
        .then(id_u => {
            let e_u=isUniqueEmail(email)
                .then(e_u => {
                    if (e_u && id_u) {
                        // console.log('GOOD');

                        next();

                    }
                    else{
                        ValErr(res);
                        //res.status(400).send({message:'Not unique email  or id'});
                        //next();
                        //return;
                    }
                })

    })
        .catch(err=>{
            console.log(err);

            next(err);
        })




}
export {CheckRequiredField}