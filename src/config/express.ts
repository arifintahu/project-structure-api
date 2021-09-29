import * as express from 'express';
import * as compression from 'compression';
import * as cors from 'cors';
import routes from '../api/routes/v1';
import { Application } from 'express';

export default function expressConfig(app: Application): Promise<Application> {
  return new Promise((resolve, reject) => {
    const API: string = process.env.API || 'api/v1';
    try {
      app.use(express.urlencoded({ extended: true }));
      app.use(express.json());
      app.use('*', cors());
      app.use(compression());
      app.use(`/${API}`, routes);
      resolve(app);
    } catch (e) {
      reject(new Error('Could not start load express'));
    }
  });
}
