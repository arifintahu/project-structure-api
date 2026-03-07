import { Router } from 'express';
import RoleController from '../../controllers/RoleController';
import Auth from '../../middlewares/auth';
import { Validate, Requirements } from '../../middlewares/validator';
import { ROLE } from '../../../constants';

const rolesRouter: Router = Router();

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create role
 *     description: Create a new role (admin only)
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *           example:
 *             name: Admin
 *             description: Admin All User
 *     responses:
 *       201:
 *         description: Role created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       409:
 *         description: Role already exists
 *   get:
 *     summary: Get roles
 *     description: Get all roles (admin only)
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Roles fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
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
