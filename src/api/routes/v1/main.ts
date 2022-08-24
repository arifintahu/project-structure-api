import { Router } from 'express';
import { authController } from '../../controllers';

const mainRouter: Router = Router();

mainRouter.route('/login').post(authController.login);
mainRouter.route('/signup').post(authController.signUp);

export default mainRouter;
