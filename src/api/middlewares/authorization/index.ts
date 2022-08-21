import JWT from '../../lib/jwt';
import { NextFunction, Request, Response } from 'express';
import { loginRepository } from '../../repositories';

class Authorization {
    jwt: typeof JWT;
    loginRepository: typeof loginRepository;
    constructor() {
        this.jwt = JWT;
        this.loginRepository = loginRepository;
    }

    async authorize(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const authorization = String(req.headers['x-authorization']);
        if (!authorization || !authorization.includes('Bearer')) {
            res.status(401).send({
                status: false,
                msg: 'unauthorized'
            });
            return;
        }
        const token = authorization?.slice(7);
        const payload = await this.jwt.verifyToken(token).catch(() => {
            res.status(401).send({
                status: false,
                msg: 'unauthorized'
            });
            return;
        });

        if (!payload) {
            res.status(401).send({
                status: false,
                msg: 'unauthorized'
            });
            return;
        }

        const userdata = await this.loginRepository.findOne(
            <string>payload.sub
        );

        if (!userdata) {
            res.status(401).send({
                status: false,
                msg: 'unauthorized'
            });
            return;
        }
        req.params.userdata = userdata?.getDataValue('email');

        next();
    }
}

export default new Authorization();
