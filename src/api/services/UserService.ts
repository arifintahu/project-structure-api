import * as bcrypt from 'bcrypt';
import UserRepository from '../repositories/UserRepository';
import { UserInput, UserInputUpdate, UserOutput } from '../models/User';

interface IUserService {
    createUser(payload: UserInput): Promise<UserOutput>;
    getUsers(): Promise<UserOutput[]>;
    getUserDetail(userId: number): Promise<UserOutput>;
    updateUser(userId: number, data: UserInputUpdate): Promise<boolean>;
    deleteUser(userId: number): Promise<boolean>;
}

class UserService implements IUserService {
    async createUser(payload: UserInput): Promise<UserOutput> {
        const user = await UserRepository.getUserByEmail(payload.email);

        if (user) {
            throw new Error('Email must be unique');
        }

        const hashedPassword = bcrypt.hashSync(payload.password, 5);

        return UserRepository.createUser({
            ...payload,
            password: hashedPassword
        });
    }

    getUsers(): Promise<UserOutput[]> {
        return UserRepository.getUsers();
    }

    async getUserDetail(userId: number): Promise<UserOutput> {
        const user = await UserRepository.getUserDetail(userId);

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    async updateUser(
        userId: number,
        payload: UserInputUpdate
    ): Promise<boolean> {
        const user = await UserRepository.getUserDetail(userId);

        if (!user) {
            throw new Error('User not found');
        }

        return UserRepository.updateUser(userId, payload);
    }

    async deleteUser(userId: number): Promise<boolean> {
        const user = await UserRepository.getUserDetail(userId);

        if (!user) {
            throw new Error('User not found');
        }

        return UserRepository.deleteUser(userId);
    }
}

export default new UserService();
