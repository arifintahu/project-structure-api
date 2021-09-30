import { userService } from '../services';
import { Request, Response } from 'express';

export async function findAll(req: Request, res: Response): Promise<void> {
  const result = await userService.findAll();
  if (result) {
    res.send(result);
  } else {
    res.status(400).json({
      ok: false,
      msg: 'null'
    });
  }
}
