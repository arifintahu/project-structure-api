import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/AuthService';
import { LoginType, SignUpType } from '../types/auth';

class AuthController {
    async login(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const payload: LoginType = req.body;
            const token = await AuthService.login(payload);
            res.status(200).send({
                message: 'Logged in successfully',
                data: token
            });
        } catch (error) {
            next(error);
        }
    }

    async signUp(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const payload: SignUpType = req.body;
            await AuthService.signUp(payload);
            res.status(200).send({
                message: 'Signed up successfully'
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();
