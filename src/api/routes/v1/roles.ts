import { Router } from 'express';
import RoleController from '../../controllers/RoleController';
import Auth from '../../middlewares/auth';
import { Validate, Requirements } from '../../middlewares/validator';
import { ROLE } from '../../../constants';

const rolesRouter: Router = Router();

rolesRouter
    .route('/')
    .post(
        Auth.authenticate,
        Validate(Requirements.createRole),
        Auth.checkRoles(ROLE.ADMIN),
        RoleController.createRole
    )
    .get(
        Auth.authenticate,
        Auth.checkRoles(ROLE.ADMIN),
        RoleController.getRoles
    );

export default rolesRouter;
