import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

function apiKeyValidation(req: Request, res: Response, next: NextFunction): void {
  // Middleware to validate API key
  const apiKey = req.headers['api_key'];
  const validApiKey = process.env.API_KEY;

  if (validApiKey && apiKey === validApiKey) {
    next(); // Proceed to next middleware or route handler if valid
  } else {
    // Return a 401 Unauthorized response if the API key is invalid
    res.status(401).send({ message: "Wrong API key" });
  }
}

export { apiKeyValidation };
