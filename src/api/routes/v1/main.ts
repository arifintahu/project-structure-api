import { Router } from 'express';
import AuthController from '../../controllers/AuthController';

const mainRouter: Router = Router();

mainRouter.route('/login').post(AuthController.login);
mainRouter.route('/signup').post(AuthController.signUp);

export default mainRouter;
