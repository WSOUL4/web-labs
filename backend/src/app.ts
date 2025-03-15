import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { swaggerSpec, swaggerUi } from './Configs/swagger';
import logger from 'morgan';
import router from './Routes/main.router';
import { CustomError } from './CustomErrors/errors';
import bodyParser from 'body-parser';
import passport from './Configs/passport';

function appServerLaunch(): Express {
  dotenv.config(); // Для чтения из .env
  const app = express();
  const port = process.env.PORT;
  //app.use(cors<Request>());
  app.use(cors()); // middleware
  app.use(express.json()); // middleware
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(passport.initialize());

  app
    .listen(port, () => {
      console.info(`Сервер запустился на порте ${port}`);
    })
    .on('error', (error: Error) => {
      console.error('Не удалось запустить сервер:', error);
    });

  return app;
}

const app = appServerLaunch();

app.use(router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    res.status(400).send('Custom err');
  } else {
    next(err);
  }
});

export { app };
