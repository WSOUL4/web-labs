import express, { Request, Response, NextFunction } from 'express';
import { getAll, add, changeById } from '../Controllers/user.controller';
import { apiKeyValidation } from '../Controllers/apiKey.check';
import passport, { strategy } from '../Configs/passport';
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
usersRouter.use(passport.authenticate(strategy, { session: false }));
usersRouter.put(
  '/',

  (req: Request, res: Response, next: NextFunction) => {
    changeById(req, res);
  },
);

export default usersRouter;
