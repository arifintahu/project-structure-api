import { authService } from '../services';
import { authValidation } from '../validations';
import { Request, Response } from 'express';

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
    const result = await authService.login(params);
    res.send(result);
  } else {
    res.status(401).json({ message: 'Invalid email / password' });
  }
}

export async function registerAccount(
  req: Request,
  res: Response
): Promise<void> {
  const params = req.body;
  if (authValidation.registerAccount(params)) {
    const result = await authService.registerAccount(params).catch(() => {
      res.status(404).json({ message: 'Register error' });
    });
    res.status(200).send(result);
  } else {
    res.status(401).json({ message: 'Invalid form register' });
  }
}
