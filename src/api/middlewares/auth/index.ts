import { NextFunction, Request, Response } from 'express';
import JWT from '../../../utils/jwt';
import UserRepository from '../../repositories/UserRepository';

class Auth {
    async authenticate(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const authorization = String(req.headers.authorization);
        if (!authorization || !authorization.includes('Bearer')) {
            res.sendStatus(401);
            return;
        }
        const token = authorization?.slice(7);
        const payload = await JWT.verifyToken(token);

        if (!payload) {
            res.sendStatus(401);
            return;
        }

        const userId: number = payload.id;
        const userdata = await UserRepository.getUserDetail(userId);

        if (!userdata) {
            res.sendStatus(401);
            return;
        }
        req.userdata = userdata;

        next();
    }
}

export default new Auth();
