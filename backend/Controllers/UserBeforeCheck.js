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
        /*.finally(()=>{
            conn.close() // Always close the connection when done
               .then()})*/

}

function isIdUniqueEmail (val) {
    return User.count({
        where:
            { email: val }
    })
        .then(count => {
            //console.log(count);
            return count === 0;

        })
        /*
        .finally(()=>{
            conn.close() // Always close the connection when done
                .then()})*/

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
            res.status(400).send({message:'Not unique email  or id'});
            //next();
            //return;
        }
    });
    let e_u=isIdUniqueEmail(email)
        .then(e_u => {
            if (e_u) {
                // console.log('GOOD');
                if (email && email!==''){
                    next();
                }
            }
            else{
                res.status(400).send({message:'Not unique email  or id'});
                //next();
                //return;
            }
        })
        .catch(err=>{console.log(err);})




}
export {CheckRequiredField}