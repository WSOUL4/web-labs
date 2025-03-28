import express, { Request, Response, NextFunction } from 'express';
import { getAll, add } from '../Controllers/user.controller';
import { apiKeyValidation } from '../Controllers/apiKey.check';

const usersRouter = express.Router();

// TypeScript annotations for the request and response
usersRouter.get(
  '',

  (req: Request, res: Response, next: NextFunction) => {
    getAll(req, res);
  },
);

usersRouter.post(
  '/',

  (req: Request, res: Response, next: NextFunction) => {
    add(req, res);
  },
);

export default usersRouter;
