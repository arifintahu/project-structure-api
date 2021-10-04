import { Router, Request, Response } from 'express';
import { authController } from '../../controllers';
import { authorization } from '../../middlewares';

const route: Router = Router();

route.get('/', [authorization], (req: Request, res: Response) => {
  authController.getMeta(req, res);
});

route.post('/login', [], (req: Request, res: Response) => {
  authController.login(req, res);
});

route.post('/register', [], (req: Request, res: Response) => {
  authController.registerAccount(req, res);
});

export default route;
