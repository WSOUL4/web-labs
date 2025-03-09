import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
import express from 'express';
dotenv.config()//Для чтения из .env

function generateToken(id,l) {
    // Данные, которые вы хотите зашифровать в JWT
    const payload = {
        userId: id,
        username: l
    };

// Секретный ключ для подписи токена
    const secret = process.env.JWT_SECRET;

// Время жизни токена (например, 1 час)
    const options = {
        expiresIn: '12h' // Можно указать "1d" для одного дня, "30m" для 30 минут и т. д.
    };

// Генерация токена
    const token = jwt.sign(payload, secret, options);

   // console.log('Сгенерированный JWT:', token);
    return token;
}

function decodeToken(token) {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(decoded) ;
    return decoded;
}
function getTokenFromHeaders(req){
    let token= req.headers.authorization;
    return token;
}

export {generateToken,decodeToken,getTokenFromHeaders}