import express, { NextFunction, Request, Response } from 'express';
import {
  generateToken,
  decodeToken,
  getTokenFromHeaders,
  generateRefreshToken,
  storeRefreshToken,
} from './JWT.controller';
import { User } from '../Models/User/user.model';
import { RefreshToken } from '../Models/refreshToken.model';
import bcrypt from 'bcryptjs';

// Function to register a new user
async function register(req: Request, res: Response, next: NextFunction) {
  try {
    //const { name, email, password } = req.body;
    type UserCredentials = {
      name?: string;
      email: string;
      password: string;
    };
    const user: UserCredentials = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    // Hash the password before saving
    //const hashedPassword = await bcrypt.hash(user.password, 10);

    await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    res.status(201).send('Registered new user.');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('User registration failed.');
  }
}

// Function to log in a user
async function login(req: Request, res: Response, next: NextFunction) {
  try {
    //const { login, password } = req.body;
    type UserCredentials = {
      login: string;
      password: string;
    };
    const user: UserCredentials = {
      login: req.body.login,
      password: req.body.password,
    };
    // Find user by email or username
    const isFound = await User.findOne({ where: { email: user.login } });

    if (!isFound) {
      return res.status(403).send({ message: 'Wrong login or password' });
    } else {
      // Доступ к данным через dataValues или метод get
      const userData = isFound.get(); // Получаем все значения
      //console.log(userData); // Теперь вы можете увидеть id, name и другие поля

      const match = await bcrypt.compare(user.password, userData.password);

      if (match) {
        if (userData.id) {
          const token = generateToken(userData.id, isFound.email);
          const refreshToken = generateRefreshToken(userData.id);
          await storeRefreshToken(refreshToken);

          res.status(200).send({ token, refreshToken });
        }
      } else {
        res.status(403).send({ message: 'Wrong login or password' });
      }
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Login failed.');
  }
}

// Function to refresh access token
async function refreshAccessToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const rt = getTokenFromHeaders(req);

  try {
    if (rt !== null) {
      const dt = decodeToken(rt);

      // Verify the refresh token
      const rtoken = await RefreshToken.findOne({
        where: {
          user_id: dt.id,
          token: rt,
        },
      });

      if (!rtoken) {
        return res.status(403).send(`Token isn't valid.`);
      }

      const isFound = await User.findOne({ where: { id: dt.id } });

      if (isFound) {
        const userData = isFound.get();
        const newAccessToken = generateToken(dt.id, userData.email);
        res.status(200).send({ token: newAccessToken });
      } else {
        res.status(404).send('User not found.');
      }
    }
  } catch (e) {
    console.error('Error refreshing access token:', e);
    res.status(403).send({ message: 'Refresh token expired.' });
  }
}

export { register, login, refreshAccessToken };
