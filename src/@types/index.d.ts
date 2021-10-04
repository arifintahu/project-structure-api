import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      userdata: {
        email: string;
      };
    }
  }
}
