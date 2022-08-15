import Logger from './api/lib/logger';
import { Server } from 'net';
import { Application } from 'express';
import { PORT } from './constants';
import { createServer } from './server';

export function startServer(): Server {
    const app: Application = createServer();

    return app.listen(PORT, async () => {
        Logger.debug(`Server is listening on port ${PORT}`);
    });
}

startServer();
