import express from 'express'
import {getParameterByName} from './SharedFuncs.js'
import {ValidationError} from "../CustomErrors/errors.js";
import {User} from '../Models/User/user_model.js'
import {conn} from "../Database/db_start.js";


function isIdUniqueId (val) {
    return User.count({
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
    let email=getParameterByName('email',req.url);
    let id=getParameterByName('id',req.url);
    let id_u=isIdUniqueId(id)
        .then(id_u => {
        if (id_u) {
           // console.log('GOOD');
        }
        else{
            res.status(400).send({message:'Not unique email  or id'})
        }
    });
try {
    if (email && email!=='' && id){
         next();
    }else{
        //throw ValidationError;
        res.status(400).send({message:'No email or id, they are required'})
    }
}catch (e) {
    if (e instanceof ValidationError){
        res.status(400).send({message: 'No email or id, they are required'});
    }
}


}
export {CheckRequiredField}