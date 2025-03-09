
import express from 'express';
import {generateToken,decodeToken,getTokenFromHeaders} from './JWT.js';
//import {CheckRegField} from './AuthBeforeCheck.js';
import {User} from "../Models/User/user_model.js";
import bcrypt from "bcryptjs";

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

}
async function login(req,res,next){
    try {
        //name, email, password
        let p = req.body;
        //let password= await bcrypt.hash(p.password,10);
        //console.log(p.password);
        let q=User.findOne( {
            where: {
                email: p.login,
                //password: p.password

            }
        })
            .then(async (q) => {



                const match = await bcrypt.compare(p.password, q.password);




                if (match) {
                    //let id=q.id;

                    let token=generateToken(q.id,q.email);
                    //console.log(token);
                    res.status(200).send({token: token});
                    next();
                }else{
                    res.status(403).send({message:'Wrong login or password'});
                }
            })
            .catch(err=>{ res.status(500).send(`Not logged`);})

    } catch (error) {
        console.error('Error registering user:', error);
    }
}

export {register,login}