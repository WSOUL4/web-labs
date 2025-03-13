
import express from 'express';
import {generateToken,decodeToken,getTokenFromHeaders,generateRefreshToken,storeRefreshToken} from './JWT.controller.js';
//import {CheckRegField} from './auth.prepare.js';
import {User} from "../Models/User/user.model.js";
import {RefreshToken} from '../Models/refreshToken.model.js';
import bcrypt from "bcryptjs";

function register(req,res,next){
    //console.log(req.body);
    try {
        //name, email, password
        let p = req.body;
        User.create({
            name: p.name,
            email: p.email,
            password: p.password})
            .then(()=>{
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

        User.findOne( {
            where: {
                email: p.login,
            }
        })
            .then(async (user) => {
                const match = await bcrypt.compare(p.password, user.password);
                if (match) {
                    //let id=q.id;
                    let token=generateToken(user.id,user.email);
                    let refreshToken=generateRefreshToken(user.id);
                    storeRefreshToken(refreshToken);
                    //console.log(token);
                    res.status(200).send({token: token, refreshToken: refreshToken});
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

function refreshAccessToken(req,res,next){
    let rt=getTokenFromHeaders(req);

    try{
        let dt=decodeToken(rt);//id, iat, exp
        //console.log(dt);
        //user_id, token, expires_at

        RefreshToken.findOne( {
            where: {
                user_id: dt.id,
                token: rt,
                expires_at: dt.exp
            }
        })
            .then( rtoken => {
                if (rtoken.length!==0){
                    User.findOne({
                        where: {
                            id: dt.id,
                        }
                    })
                        .then(user=>{
                            let newAccessToken= generateToken(dt.id,user.email);
                            res.status(200).send({token: newAccessToken});
                            next();

                        })
                        .catch()
                }else {
                    res.status(403).send(`Token isn't valid at all`);
                }
            })
            .catch(err=>{ res.status(500).send(`Server err`);})

    } catch (e) {
        res.status(403).send({message:'Refresh token expired'});
    }



}
export {register,login,refreshAccessToken}