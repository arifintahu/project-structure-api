import * as express from 'express';
import constants from './constants';
import { expressConfig } from './config';
import { createServer } from 'http';
import { Server } from 'net';
import { Application } from 'express';

export async function startServer(): Promise<Server> {
  await constants();
  const app: Application = await expressConfig(express());

  const PORT: number = parseInt(<string>process.env.PORT, 10) || 3000;
  app.set('port', PORT);
  const httpServer = createServer(app);

  return httpServer.listen(PORT, () => {
    console.log('Server is listening on port ', PORT);
  });
}

startServer();
