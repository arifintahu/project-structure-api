import * as express from 'express';
import * as compression from 'compression';
import * as cors from 'cors';
import * as swaggerUi from 'swagger-ui-express';
import routesV1 from './api/routes/v1';
import MorganMiddleware from './api/middlewares/morgan';
import { Application } from 'express';
import AppConfig from './config/appConfig';
import { specs } from './utils/swagger';
import errorHandler from './api/middlewares/handlers/error';

export function createServer(): Application {
    const app = express();
    const corsOption = {
        origin: '*',
        credentials: true
    };

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors(corsOption));
    app.use(compression());
    app.use(MorganMiddleware);
    app.use(`/api/${AppConfig.app.apiVersion}`, routesV1);

    if (AppConfig.app.isDevelopment) {
        app.use(
            `/docs/${AppConfig.app.apiVersion}`,
            swaggerUi.serve,
            swaggerUi.setup(specs)
        );
    }

    app.use(errorHandler);

    return app;
}
