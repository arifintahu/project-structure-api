import { Router } from 'express';
import RoleController from '../../controllers/RoleController';
import Auth from '../../middlewares/auth';
import { Validate, Requirements } from '../../middlewares/validator';

const rolesRouter: Router = Router();

rolesRouter
    .route('/')
    .post(
        Auth.authenticate,
        Validate(Requirements.createRole),
        RoleController.createRole
    )
    .get(Auth.authenticate, RoleController.getRoles);

export default rolesRouter;
