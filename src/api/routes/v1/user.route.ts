import { Router, Request, Response } from 'express';
import { userController } from '../../controllers';
import { authorization } from '../../middlewares';

const route: Router = Router();

route.post('/register', [], (req: Request, res: Response) => {
  userController.register(req, res);
});

route.put('/remove', [authorization], (req: Request, res: Response) => {
  userController.remove(req, res);
});

export default route;
