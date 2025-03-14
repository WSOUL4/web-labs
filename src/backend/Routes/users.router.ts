import express, { Request, Response, NextFunction } from 'express';
import { getAll, add } from '@controllers/user.controller';
import { apiKeyValidation } from '@controllers/apiKey.check';

const usersRouter = express.Router();

// TypeScript annotations for the request and response
usersRouter.get(
  '',
  apiKeyValidation,
  (req: Request, res: Response, next: NextFunction) => {
    getAll(req, res);
  },
);

usersRouter.post(
  '/',
  apiKeyValidation,
  (req: Request, res: Response, next: NextFunction) => {
    add(req, res);
  },
);

export default usersRouter;
