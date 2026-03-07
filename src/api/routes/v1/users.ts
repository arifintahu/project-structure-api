import { Router } from 'express';
import UserController from '../../controllers/UserController';
import Auth from '../../middlewares/auth';
import { Validate, Requirements } from '../../middlewares/validator';
import { ROLE } from '../../../constants';

const usersRouter: Router = Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create user
 *     description: Create a new user (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, firstName]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               roleId:
 *                 type: integer
 *           example:
 *             email: user@mail.com
 *             password: user
 *             firstName: John
 *             lastName: Doe
 *             roleId: 1
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       409:
 *         description: Email already exists
 *       422:
 *         description: Validation error
 *   get:
 *     summary: Get users
 *     description: Get paginated list of users (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
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

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user detail
 *     description: Get user details by ID (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 *   put:
 *     summary: Update user
 *     description: Update user by ID (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firstName]
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               roleId:
 *                 type: integer
 *           example:
 *             firstName: John
 *             lastName: Doe
 *             roleId: 1
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 *       422:
 *         description: Validation error
 *   delete:
 *     summary: Delete user
 *     description: Soft delete user by ID (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 */
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
