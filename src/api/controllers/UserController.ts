import { NextFunction, Request, Response } from 'express';
import UserService from '../services/UserService';
import { CreateUserType } from '../types/user';

class UserController {
    userService: UserService;
    constructor() {
        this.userService = new UserService();
    }

    async createUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const payload: CreateUserType = req.body;
            const user = await this.userService.createUser(payload);
            res.status(200).json({
                message: 'User created successfully',
                data: user
            });
        } catch (error) {
            next(error);
        }
    }

    async getUsers(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const user = await this.userService.getUsers();
            res.status(200).json({
                message: 'Users fetched successfully',
                data: user
            });
        } catch (error) {
            next(error);
        }
    }
}

export default UserController;
