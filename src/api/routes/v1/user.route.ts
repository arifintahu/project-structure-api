import { Router, Request, Response } from 'express';
import { userController } from '../../controllers';

const route: Router = Router();

route.get('/user', (req: Request, res: Response) => {
  userController.findUser(req, res);
});

export default route;
