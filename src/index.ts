import * as express from 'express';
import Logger from './api/lib/logger';
import { expressConfig, syncDB } from './config';
import { createServer } from 'http';
import { Server } from 'net';
import { Application } from 'express';
import { PORT } from './constants';

export async function startServer(): Promise<Server> {
  const app: Application = await expressConfig(express());
  const httpServer = createServer(app);
  app.set('port', PORT);

  return httpServer.listen(PORT, async () => {
    await syncDB();
    Logger.debug(`Server is listening on port ${PORT}`);
  });
}

startServer();
