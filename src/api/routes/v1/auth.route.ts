/**
 *  @openapi
 *  /auth:
 *    get:
 *      summary: Get meta data
 *      description: Get meta data from token
 *      tags:
 *      - auth
 *      parameters:
 *      - in: header
 *        name: x-authorization
 *        description: Token to be passed as a header
 *        required: true
 *      responses:
 *        200:
 *          description: Returns without error.
 *          content:
 *            'application/json': {}
 *        400:
 *          description: Bad Request
 *        401:
 *          description: Unauthorized
 *  @openapi
 *  /auth/login:
 *    post:
 *      summary: Login
 *      description: Login
 *      tags:
 *      - auth
 *      requestBody:
 *        description: Login body
 *        content:
 *          'application/json':
 *            schema:
 *              properties:
 *                email:
 *                  description: User Email
 *                  type: string
 *                  format: email
 *                password:
 *                  description: User password
 *                  type: string
 *              required:
 *              - email
 *              - password
 *              example:
 *                email: 'miftahul97@gmail.com'
 *                password: '12345'
 *        required: true
 *      responses:
 *        200:
 *          description: Returns without error.
 *          content:
 *            'application/json': {}
 *        400:
 *          description: Bad Request
 *        403:
 *          description: Validation failed
 */
import { Router, Request, Response } from 'express';
import { authController } from '../../controllers';
import { authorization } from '../../middlewares';

const route: Router = Router();

route.get('/', [authorization], (req: Request, res: Response) => {
  authController.getMeta(req, res);
});

route.post('/login', [], (req: Request, res: Response) => {
  authController.login(req, res);
});

export default route;
