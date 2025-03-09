import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import passport from 'passport';
import {User} from '../Models/User/user_model.js';
import dotenv from 'dotenv';
import express from 'express';
dotenv.config()//Для чтения из .env
/*
const options={
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

passport.use(

    new JwtStrategy(options, async (paylod,done)=>{
        try{
            const user=await User.findByPk(payload.id);
            if (user){
                return done(null,user);
            }
            return done(null,false);
        } catch (e) {
            return done(e,false);
        }
    })
);
*/


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET, // используйте ваш секретный ключ
};

const strategy = new JwtStrategy(options, async (payload, done) => {
    try {
        const user = User.findOne( {
            where: {id: payload.id}
        })
            .then(user=>{
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            })

    } catch (error) {
        done(error, false);
    }
});



export {passport,strategy}



