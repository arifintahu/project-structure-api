import { Router } from 'express';
import mainRouter from './main';
import usersRouter from './users';

const router: Router = Router();
router.use('/', mainRouter);
router.use('/users', usersRouter);

export default router;
