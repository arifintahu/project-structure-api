import UserRepository from '../repositories/UserRepository';
import { UserInput, UserInputUpdate, UserOutput } from '../models/User';
import { IUserService } from './interfaces/IUserService';
import { NotFoundError, ConflictError } from '../../errors/AppError';
import { PaginationOptions, PaginatedResult } from '../types/pagination';

type PublicUserOutput = Omit<UserOutput, 'password'>;

class UserService implements IUserService {
    async createUser(payload: UserInput): Promise<PublicUserOutput> {
        const user = await UserRepository.getUserByEmail(payload.email);

        if (user) {
            throw new ConflictError('Email must be unique');
        }

        return UserRepository.createUser(payload);
    }

    getUsers(
        options?: PaginationOptions
    ): Promise<PaginatedResult<UserOutput>> {
        return UserRepository.getUsers(options);
    }

    async getUserDetail(userId: number): Promise<UserOutput> {
        const user = await UserRepository.getUserDetail(userId);

        if (!user) {
            throw new NotFoundError('User not found');
        }

        return user;
    }

    async updateUser(
        userId: number,
        payload: UserInputUpdate
    ): Promise<boolean> {
        const user = await UserRepository.getUserDetail(userId);

        if (!user) {
            throw new NotFoundError('User not found');
        }

        return UserRepository.updateUser(userId, payload);
    }

    async deleteUser(userId: number): Promise<boolean> {
        const user = await UserRepository.getUserDetail(userId);

        if (!user) {
            throw new NotFoundError('User not found');
        }

        return UserRepository.deleteUser(userId);
    }
}

export default new UserService();
