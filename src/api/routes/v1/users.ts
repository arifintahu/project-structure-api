import { Router } from 'express';
import UserController from '../../controllers/UserController';
import Auth from '../../middlewares/auth';

const usersRouter: Router = Router();

usersRouter
    .route('/')
    .post(Auth.authenticate, UserController.createUser)
    .get(Auth.authenticate, UserController.getUsers);

export default usersRouter;
