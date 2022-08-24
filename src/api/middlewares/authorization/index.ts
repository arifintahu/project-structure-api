import JWT from '../../../utils/jwt';
import { NextFunction, Request, Response } from 'express';
import UserRepository from '../../repositories/UserRepository';

class Authorization {
    jwt: JWT;
    userRepository: UserRepository;
    constructor() {
        this.jwt = new JWT();
        this.userRepository = new UserRepository();
    }

    async authorize(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const authorization = String(req.headers.authorization);
        if (!authorization || !authorization.includes('Bearer')) {
            res.status(401).send({
                status: false,
                msg: 'unauthorized'
            });
            return;
        }
        const token = authorization?.slice(7);
        const payload = await this.jwt.verifyToken(token);

        if (!payload) {
            res.status(401).send({
                status: false,
                msg: 'unauthorized'
            });
            return;
        }

        const userdata = await this.userRepository.getUserDetail(
            <number>payload.id
        );

        if (!userdata) {
            res.status(401).send({
                status: false,
                msg: 'unauthorized'
            });
            return;
        }
        req.userdata = userdata;

        next();
    }
}

export default new Authorization();
