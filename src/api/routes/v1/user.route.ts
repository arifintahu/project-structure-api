import { Router, Request, Response } from 'express';
import { userController } from '../../controllers';

const route: Router = Router();

route.get('/', (req: Request, res: Response) => {
  userController.findAll(req, res);
});

export default route;
