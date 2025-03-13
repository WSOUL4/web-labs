import express from 'express'
//import {getParameterByName} from './SharedFuncs.js'
import {valErr} from "../CustomErrors/errors.js";
import {User} from '../Models/User/user.model.js'
import {conn} from "../Configs/start.database.js";
import {isUniqueEmail, isUniqueId} from "../Utilities/Users/user.utils.js";


function checkRequiredField(req, res, next){
    //console.log(req.body);
    let email=req.body.email;
    if (!email){valErr(res);return;}

    //console.log(id);

            isUniqueEmail(email)
                .then(isEmailUni => {
                    if (isEmailUni ) {
                        // console.log('GOOD');

                        next();

                    }
                    else{
                        valErr(res);
                        //res.status(400).send({message:'Not unique email  or id'});
                        //next();
                        //return;
                    }
                })


        .catch(err=>{
            console.log(err);

            next(err);
        })




}
export {checkRequiredField}