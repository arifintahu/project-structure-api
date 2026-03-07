import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/AuthService';
import { LoginType, SignUpType } from '../types/auth';
import ApiResponse from '../../utils/response/ApiResponse';

class AuthController {
    async login(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const payload: LoginType = req.body;
            const token = await AuthService.login(payload);
            ApiResponse.success(res, 'Logged in successfully', token);
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
            ApiResponse.success(res, 'Signed up successfully', null, 201);
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();
