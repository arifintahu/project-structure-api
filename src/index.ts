import dotenv from 'dotenv';
dotenv.config();

import { validateEnv } from './config/validateEnv';
validateEnv();

import { Server } from 'net';
import { createServer } from './server';
import Logger from './utils/logger';
import AppConfig from './config/appConfig';
import { db } from './database/config';

const PORT = AppConfig.app.port;

function startServer(): Server {
    const app = createServer();

    const server = app.listen(PORT, () => {
        Logger.debug(
            `App ${AppConfig.app.name} with api version ${AppConfig.app.apiVersion} is starting`
        );
        Logger.debug(`App is listening on port ${PORT}`);
    });

    // Graceful shutdown
    const shutdown = async (signal: string) => {
        Logger.info(`${signal} received. Starting graceful shutdown...`);

        server.close(async () => {
            Logger.info('HTTP server closed');

            try {
                await db.close();
                Logger.info('Database connection closed');
            } catch (err) {
                Logger.error(`Error closing database: ${err}`);
            }

            process.exit(0);
        });

        // Force exit after 10 seconds
        setTimeout(() => {
            Logger.error('Forced shutdown after timeout');
            process.exit(1);
        }, 10000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

    return server;
}

startServer();
