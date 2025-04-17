import jwt, { JwtPayload } from 'jsonwebtoken';
import { RefreshToken } from '../Models/refreshToken.model';
import dotenv from 'dotenv';
import express, { Request } from 'express';

dotenv.config(); // Load environment variables from .env file

interface TokenPayload {
  id: number; // Adjust the type according to your user ID type (number/string)
  login?: string; // Optional: include this if login is part of your payload
}

// Function to generate a JWT
function generateToken(id: number, login: string): string {
  const payload: TokenPayload = {
    id,
    login,
  };

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables.');
  }

  const options: jwt.SignOptions = {
    // Specify the options type
    expiresIn: '1h',
  };

  // Generate the JWT
  const token = jwt.sign(payload, secret, options);
  return token;
}

// Function to generate a refresh token
function generateRefreshToken(id: number): string {
  const payload: TokenPayload = { id };
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables.');
  }

  const options: jwt.SignOptions = {
    expiresIn: '14d',
  };

  // Generate the refresh token
  const token = jwt.sign(payload, secret, options);
  return token;
}

// Function to decode a token
function decodeToken(token: string): JwtPayload {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables.');
  }

  // Decode and verify the token
  return jwt.verify(token, secret) as JwtPayload;
}

// Function to get token from headers
function getTokenFromHeaders(req: Request): string | null {
  const token = req.headers.authorization;
  return token ? token.replace(/^Bearer\s+/, '') : null;
}

// Function to store the refresh token in the database
async function storeRefreshToken(rt: string): Promise<void> {
  const dt = decodeToken(rt);

  try {
    await RefreshToken.create({
      user_id: dt.id,
      token: rt,
      expires_at: dt.exp,
    });
  } catch (error) {
    console.error('Error storing refresh token:', error);
  }
}

export {
  generateToken,
  decodeToken,
  getTokenFromHeaders,
  generateRefreshToken,
  storeRefreshToken,
};
