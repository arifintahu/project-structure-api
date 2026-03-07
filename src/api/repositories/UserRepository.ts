import User, { UserInput, UserInputUpdate, UserOutput } from '../models/User';
import Role from '../models/Role';
import { IUserRepository } from './interfaces/IUserRepository';
import {
    PaginationOptions,
    PaginatedResult,
    DEFAULT_PAGE,
    DEFAULT_LIMIT
} from '../types/pagination';

class UserRepository implements IUserRepository {
    createUser(payload: UserInput): Promise<UserOutput> {
        return User.create(payload);
    }

    async getUsers(
        options?: PaginationOptions
    ): Promise<PaginatedResult<UserOutput>> {
        const page = options?.page || DEFAULT_PAGE;
        const limit = options?.limit || DEFAULT_LIMIT;
        const offset = (page - 1) * limit;

        const { rows, count } = await User.findAndCountAll({
            attributes: ['id', 'roleId', 'firstName', 'lastName', 'email'],
            limit,
            offset,
            order: [['id', 'ASC']]
        });

        return {
            items: rows,
            total: count,
            page,
            limit,
            totalPages: Math.ceil(count / limit)
        };
    }

    getUserDetail(userId: number): Promise<UserOutput | null> {
        return User.findByPk(userId, {
            attributes: ['id', 'firstName', 'lastName', 'email'],
            include: [
                {
                    model: Role,
                    as: 'role',
                    required: false
                }
            ]
        });
    }

    getUserByEmail(email: string): Promise<UserOutput | null> {
        return User.findOne({
            where: {
                email: email
            }
        });
    }

    async updateUser(
        userId: number,
        payload: UserInputUpdate
    ): Promise<boolean> {
        const [updatedUserCount] = await User.update(payload, {
            where: {
                id: userId
            }
        });
        return !!updatedUserCount;
    }

    async deleteUser(userId: number): Promise<boolean> {
        const deletedUserCount = await User.destroy({
            where: {
                id: userId
            }
        });
        return !!deletedUserCount;
    }
}

export default new UserRepository();
