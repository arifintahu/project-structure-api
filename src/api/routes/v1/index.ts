import { Router } from 'express';
import main from './main.route';
import user from './user.route';

const router: Router = Router();
router.use('/', main);
router.use('/user', user);

export default router;
