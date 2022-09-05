import * as bcrypt from 'bcrypt';
import UserRepository from '../repositories/UserRepository';
import { UserInput, UserOutput } from '../models/User';
import JWT from '../../utils/jwt';

interface IAuthService {
    login(payload: UserInput): Promise<string>;
    signUp(payload: UserInput): Promise<UserOutput>;
}

class AuthService implements IAuthService {
    async login(payload: UserInput): Promise<string> {
        const user = await UserRepository.getUserByEmail(payload.email);

        if (!user) {
            throw new Error('User not found');
        }

        const isValid = bcrypt.compareSync(payload.password, user.password);

        if (!isValid) {
            throw new Error('Email and Password is not match');
        }

        const token = await JWT.signToken(user.id);

        if (!token) {
            throw new Error('Invalid token');
        }

        return token;
    }

    async signUp(payload: UserInput): Promise<UserOutput> {
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
}

export default new AuthService();
