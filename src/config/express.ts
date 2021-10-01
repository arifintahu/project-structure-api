import * as express from 'express';
import * as compression from 'compression';
import * as cors from 'cors';
import routes from '../api/routes/v1';
import { morganMiddleware } from '../api/middlewares';
import { Application } from 'express';
import { API } from '../constants';

export default function expressConfig(app: Application): Application {
  const corsOption = {
    origin: '*',
    credentials: true
  };

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors(corsOption));
  app.use(compression());
  app.use(morganMiddleware);
  app.use(`/${API}`, routes);

  return app;
}
