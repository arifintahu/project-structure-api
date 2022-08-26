import { NextFunction, Request, Response } from 'express';
import UserService from '../services/UserService';
import { CreateUserType, UpdateUserType } from '../types/user';

class UserController {
    async createUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const payload: CreateUserType = req.body;
            const user = await UserService.createUser(payload);
            res.status(200).send({
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
            const user = await UserService.getUsers();
            res.status(200).send({
                message: 'Users fetched successfully',
                data: user
            });
        } catch (error) {
            next(error);
        }
    }

    async getUserDetail(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const userId = Number(req.params.id);
            const user = await UserService.getUserDetail(userId);
            res.status(200).send({
                message: 'User details fetched successfully',
                data: user
            });
        } catch (error) {
            next(error);
        }
    }

    async updateUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const userId = Number(req.params.id);
            const payload: UpdateUserType = req.body;
            await UserService.updateUser(userId, payload);
            res.status(200).send({
                message: 'User updated successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const userId = Number(req.params.id);
            await UserService.deleteUser(userId);
            res.status(200).send({
                message: 'User deleted successfully'
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();
