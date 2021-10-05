import { userService } from '../services';
import { userValidation } from '../validations';
import { Request, Response } from 'express';
import Logger from '../lib/logger';

export async function register(req: Request, res: Response): Promise<void> {
  const params = req.body;
  if (userValidation.register(params)) {
    const result = await userService.register(params).catch((err) => {
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

export async function remove(req: Request, res: Response): Promise<void> {
  const params = req.body;
  if (params.id) {
    const result = await userService.remove(params).catch((err) => {
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
