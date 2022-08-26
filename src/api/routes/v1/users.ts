import { Router } from 'express';
import UserController from '../../controllers/UserController';
import Auth from '../../middlewares/auth';
import { Validate, Requirements } from '../../middlewares/validator';
import { ROLE } from '../../../constants';

const usersRouter: Router = Router();

usersRouter
    .route('/')
    .post(
        Auth.authenticate,
        Validate(Requirements.createUsers),
        Auth.checkRoles(ROLE.ADMIN),
        UserController.createUser
    )
    .get(
        Auth.authenticate,
        Auth.checkRoles(ROLE.ADMIN),
        UserController.getUsers
    );

usersRouter
    .route('/:id')
    .get(
        Auth.authenticate,
        Validate(Requirements.getUserDetail),
        Auth.checkRoles(ROLE.ADMIN),
        UserController.getUserDetail
    )
    .put(
        Auth.authenticate,
        Validate(Requirements.updateUser),
        Auth.checkRoles(ROLE.ADMIN),
        UserController.updateUser
    )
    .delete(
        Auth.authenticate,
        Validate(Requirements.deleteUser),
        Auth.checkRoles(ROLE.ADMIN),
        UserController.deleteUser
    );

export default usersRouter;
