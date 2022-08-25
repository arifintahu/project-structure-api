import * as bcrypt from 'bcrypt';
import UserRepository from '../repositories/UserRepository';
import { UserInput, UserOutput } from '../models/User';

interface IUserService {
    createUser(payload: UserInput): Promise<UserOutput>;
    getUsers(): Promise<UserOutput[]>;
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
}

export default new UserService();
