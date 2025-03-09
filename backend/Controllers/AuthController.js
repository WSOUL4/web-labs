
import express from 'express';
import {generateToken,decodeToken,getTokenFromHeaders} from './JWT.js';
import {CheckAuthField} from './AuthBeforeCheck.js';
import {User} from "../Models/User/user_model.js";
function register(req,res,next){
    //console.log(req.body);
    try {
        //name, email, password
        let p = req.body;
        let q= User.create({
            name: p.name,
            email: p.email,
            password: p.password})
            .then(q=>{

                res.status(200).send(`Registered new user`);

            })
            .catch(err=>{ res.status(500).send(`Not Registered`);})

    } catch (error) {
        console.error('Error registering user:', error);
    }

   // next();

}

export {register}