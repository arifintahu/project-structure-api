import { authService } from '../services';
import { authValidation } from '../validations';
import { Request, Response } from 'express';
import Logger from '../lib/logger';

export async function getMeta(req: Request, res: Response): Promise<void> {
  const result = await authService.login(req.body);
  if (result) {
    res.send(result);
  } else {
    res.status(400).json({
      ok: false,
      msg: 'null'
    });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  const params = req.body;
  if (authValidation.login(params)) {
    const result = await authService.login(params).catch((err) => {
      Logger.error(err);
      res.status(400);
    });
    res.status(200).send(result);
  } else {
    res.status(403).json({ message: 'Validation failed' });
  }
}

export async function registerAccount(
  req: Request,
  res: Response
): Promise<void> {
  const params = req.body;
  if (authValidation.registerAccount(params)) {
    const result = await authService.registerAccount(params).catch((err) => {
      Logger.error(err);
      res.status(400);
    });
    res.status(200).send(result);
  } else {
    res.status(403).json({ message: 'Validation failed' });
  }
}
