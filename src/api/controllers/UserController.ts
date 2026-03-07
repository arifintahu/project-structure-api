import { NextFunction, Request, Response } from 'express';
import UserService from '../services/UserService';
import { CreateUserType, UpdateUserType } from '../types/user';
import ApiResponse from '../../utils/response/ApiResponse';
import { DEFAULT_PAGE, DEFAULT_LIMIT } from '../types/pagination';

class UserController {
    async createUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const payload: CreateUserType = req.body;
            const user = await UserService.createUser(payload);
            ApiResponse.success(res, 'User created successfully', user, 201);
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
            const page = Number(req.query.page) || DEFAULT_PAGE;
            const limit = Number(req.query.limit) || DEFAULT_LIMIT;
            const result = await UserService.getUsers({ page, limit });
            ApiResponse.paginated(res, 'Users fetched successfully', result);
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
            ApiResponse.success(res, 'User details fetched successfully', user);
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
            ApiResponse.success(res, 'User updated successfully');
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
            ApiResponse.success(res, 'User deleted successfully');
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();
