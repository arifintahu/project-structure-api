import { Router } from 'express';
import AuthController from '../../controllers/AuthController';
import { Validate, Requirements } from '../../middlewares/validator';

const mainRouter: Router = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login
 *     description: Authenticate user with email and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *           example:
 *             email: user@mail.com
 *             password: password123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Unauthorized
 *       422:
 *         description: Validation error
 */
mainRouter
    .route('/login')
    .post(Validate(Requirements.login), AuthController.login);

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Sign up
 *     description: Register a new user account
 *     tags: [Auth]
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
 *           example:
 *             email: user@mail.com
 *             password: password123
 *             firstName: John
 *             lastName: Doe
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       409:
 *         description: Email already exists
 *       422:
 *         description: Validation error
 */
mainRouter
    .route('/signup')
    .post(Validate(Requirements.signup), AuthController.signUp);

export default mainRouter;
