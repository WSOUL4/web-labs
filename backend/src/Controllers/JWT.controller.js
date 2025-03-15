import jwt from "jsonwebtoken";
import { RefreshToken } from "../Models/refreshToken.model.js";
import dotenv from "dotenv";
import express from "express";
import { User } from "../Models/User/user.model.js";
dotenv.config(); //Для чтения из .env

function generateToken(id, l) {
  // Данные, которые вы хотите зашифровать в JWT
  const payload = {
    id: id,
    login: l,
  };

  // Секретный ключ для подписи токена
  const secret = process.env.JWT_SECRET;

  // Время жизни токена (например, 1 час)
  const options = {
    expiresIn: "1h", // Можно указать "1d" для одного дня, "30m" для 30 минут и т. д.
  };

  // Генерация токена
  const token = jwt.sign(payload, secret, options);

  // console.log('Сгенерированный JWT:', token);
  return token;
}
function generateRefreshToken(id, t) {
  const payload = {
    id: id,
  };
  const secret = process.env.JWT_SECRET;

  const options = {
    expiresIn: "14d",
  };
  const token = jwt.sign(payload, secret, options);
  return token;
}
function decodeToken(token) {
  let decoded = jwt.verify(token, process.env.JWT_SECRET);
  //console.log(decoded) ;
  return decoded;
}
function getTokenFromHeaders(req) {
  let token = req.headers.authorization;
  token = token.replace(/^Bearer\s+/, "");
  return token;
}
function storeRefreshToken(rt) {
  let dt = decodeToken(rt); //id, iat, exp
  //let u_id=dt.id;
  //console.log(dt);
  //RefreshToken

  try {
    //user_id, token, expires_at

    let q = RefreshToken.create({
      user_id: dt.id,
      token: rt,
      expires_at: dt.exp,
    })
      .then((q) => {})
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.error("Error creating user:", error);
  }
}
export {
  generateToken,
  decodeToken,
  getTokenFromHeaders,
  generateRefreshToken,
  storeRefreshToken,
};
