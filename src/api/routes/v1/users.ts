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

usersRouter
    .route('/:id')
    .get(
        Auth.authenticate,
        Validate(Requirements.getUserDetail),
        UserController.getUserDetail
    )
    .put(
        Auth.authenticate,
        Validate(Requirements.updateUser),
        UserController.updateUser
    )
    .delete(
        Auth.authenticate,
        Validate(Requirements.deleteUser),
        UserController.deleteUser
    );

export default usersRouter;
