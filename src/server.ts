import express from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import routesV1 from './api/routes/v1';
import MorganMiddleware from './api/middlewares/morgan';
import requestIdMiddleware from './api/middlewares/requestId';
import { Application } from 'express';
import AppConfig from './config/appConfig';
import { specs } from './utils/swagger';
import errorHandler from './api/middlewares/handlers/error';
import { db } from './database/config';

export function createServer(): Application {
    const app = express();

    // Security
    app.use(helmet());

    // CORS (before rate limit to allow preflight OPTIONS)
    const corsOptions = {
        origin: AppConfig.cors.origin,
        credentials: true
    };
    app.use(cors(corsOptions));

    app.use(
        rateLimit({
            windowMs: AppConfig.rateLimit.windowMs,
            max: AppConfig.rateLimit.max,
            standardHeaders: true,
            legacyHeaders: false,
            message: {
                message: 'Too many requests, please try again later',
                statusCode: 429
            }
        })
    );

    // Body parsing
    app.use(express.urlencoded({ extended: false, limit: '1mb' }));
    app.use(express.json({ limit: '1mb' }));
    app.use(compression());

    // Request ID + Logging
    app.use(requestIdMiddleware);
    app.use(MorganMiddleware);

    // Health check (outside API prefix)
    app.get('/health', async (_req, res) => {
        try {
            await db.authenticate();
            res.status(200).json({
                status: 'ok',
                uptime: process.uptime(),
                timestamp: new Date().toISOString(),
                database: 'connected'
            });
        } catch {
            res.status(503).json({
                status: 'error',
                uptime: process.uptime(),
                timestamp: new Date().toISOString(),
                database: 'disconnected'
            });
        }
    });

    // API routes
    app.use(`/api/${AppConfig.app.apiVersion}`, routesV1);

    // Swagger docs (development only)
    if (AppConfig.app.isDevelopment) {
        app.use(
            `/docs/${AppConfig.app.apiVersion}`,
            swaggerUi.serve,
            swaggerUi.setup(specs)
        );
        app.get(`/docs/${AppConfig.app.apiVersion}/spec.json`, (_req, res) => {
            res.json(specs);
        });
    }

    // Error handler (must be last)
    app.use(errorHandler);

    return app;
}
