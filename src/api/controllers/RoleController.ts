import { NextFunction, Request, Response } from 'express';
import RoleService from '../services/RoleService';
import { CreateRoleType } from '../types/role';
import ApiResponse from '../../utils/response/ApiResponse';

class RoleController {
    async createRole(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const payload: CreateRoleType = req.body;
            const role = await RoleService.createRole(payload);
            ApiResponse.success(res, 'Role created successfully', role, 201);
        } catch (error) {
            next(error);
        }
    }

    async getRoles(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const roles = await RoleService.getRoles();
            ApiResponse.success(res, 'Roles fetched successfully', roles);
        } catch (error) {
            next(error);
        }
    }
}

export default new RoleController();
