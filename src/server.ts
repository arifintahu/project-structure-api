import * as express from 'express';
import { expressConfig } from './config';
import { Application } from 'express';

export function createServer(): Application {
  const app: Application = expressConfig(express());
  return app;
}
