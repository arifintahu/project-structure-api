import { Router } from 'express';
import UserController from '../../controllers/UserController';
import Auth from '../../middlewares/auth';
import { Validate, Requirements } from '../../middlewares/validator';

const usersRouter: Router = Router();

usersRouter
    .route('/')
    .post(
        Auth.authenticate,
        Validate(Requirements.createUsers),
        UserController.createUser
    )
    .get(Auth.authenticate, UserController.getUsers);

export default usersRouter;
