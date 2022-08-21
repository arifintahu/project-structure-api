import { Router } from 'express';
import { userController } from '../../controllers';
import Authorization from '../../middlewares/authorization';

const usersRouter: Router = Router();

usersRouter
    .route('/')
    .post([], userController.createUser)
    .get([Authorization.authorize], userController.getUsers);

export default usersRouter;
