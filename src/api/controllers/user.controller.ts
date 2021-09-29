import { userService } from '../services';
import { Request, Response } from 'express';

export default {
  findUser: async (req: Request, res: Response): Promise<void> => {
    const result = await userService.findUser();
    if (result) {
      res.send(result);
    } else {
      res.status(400).json({
        ok: false,
        msg: 'null'
      });
    }
  }
};
