import { Router } from 'express';
import { userController } from '../../controllers';
import Auth from '../../middlewares/auth';

const usersRouter: Router = Router();

usersRouter
    .route('/')
    .post(Auth.authenticate, userController.createUser)
    .get(Auth.authenticate, userController.getUsers);

export default usersRouter;
