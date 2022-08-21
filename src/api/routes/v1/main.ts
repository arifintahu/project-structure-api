import { Router } from 'express';
import { authController } from '../../controllers';

const mainRouter: Router = Router();

mainRouter.route('/login').post([], authController.login);

export default mainRouter;
