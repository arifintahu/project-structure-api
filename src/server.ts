import * as express from 'express';
import * as compression from 'compression';
import * as cors from 'cors';
import * as swaggerUi from 'swagger-ui-express';
import routes from './api/routes/v1';
import MorganMiddleware from './api/middlewares/morgan';
import { Application } from 'express';
import AppConfig from './config/appConfig';
import { specs } from './utils/swagger';

export function createServer(): Application {
    const app = express();
    const corsOption = {
        origin: '*',
        credentials: true
    };

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors(corsOption));
    app.use(compression());
    app.use(MorganMiddleware);
    app.use(`/${AppConfig.app.api}`, routes);
    app.use(
        `/${AppConfig.app.api}/docs`,
        swaggerUi.serve,
        swaggerUi.setup(specs)
    );

    return app;
}
