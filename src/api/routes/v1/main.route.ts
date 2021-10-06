/**
 *  @openapi
 *  /:
 *    get:
 *      summary: Main route
 *      description: Test main route
 *      tags:
 *      - main
 *      responses:
 *        200:
 *          description: Returns without error.
 */
import { Router, Request, Response } from 'express';

const route: Router = Router();

route.get('/', (req: Request, res: Response) => {
  res.sendStatus(200);
});

export default route;
