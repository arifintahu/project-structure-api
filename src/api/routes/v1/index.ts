import { Router } from 'express';
import main from './main.route';
import user from './user.route';
import auth from './auth.route';

const router: Router = Router();
router.use('/', main);
router.use('/auth', auth);
router.use('/user', user);

export default router;
