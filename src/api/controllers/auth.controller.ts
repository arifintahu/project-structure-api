import { authService } from '../services';
import { authValidation } from '../validations';
import { Request, Response } from 'express';
import Logger from '../lib/logger';

export async function getMeta(req: Request, res: Response): Promise<void> {
  const params = {
    userdata: req.params.userdata
  };
  const result = await authService.getMeta(params).catch((err) => {
    Logger.error(err);
    res.status(400);
  });
  if (result) {
    res.status(200).send({
      success: true,
      payload: result
    });
  } else {
    res.status(400).send({ message: 'Not found' });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  const params = req.body;
  if (authValidation.login(params)) {
    const result = await authService.login(params).catch((err) => {
      Logger.error(err);
      res.status(400);
    });
    res.status(200).send({
      success: true,
      payload: result
    });
  } else {
    res.status(403).send({ message: 'Validation failed' });
  }
}
