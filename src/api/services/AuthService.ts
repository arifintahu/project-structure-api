import bcrypt from 'bcrypt';
import UserRepository from '../repositories/UserRepository';
import { UserInput, UserOutput } from '../models/User';
import JWT from '../../utils/jwt';
import { IAuthService } from './interfaces/IAuthService';
import {
    NotFoundError,
    UnauthorizedError,
    ConflictError,
    InternalError
} from '../../errors/AppError';

class AuthService implements IAuthService {
    async login(payload: UserInput): Promise<string> {
        const user = await UserRepository.getUserByEmail(payload.email);

        if (!user) {
            throw new NotFoundError('User not found');
        }

        const isValid = await bcrypt.compare(payload.password, user.password);

        if (!isValid) {
            throw new UnauthorizedError('Email and Password is not match');
        }

        const token = await JWT.signToken(user.id);

        if (!token) {
            throw new InternalError('Invalid token');
        }

        return token;
    }

    async signUp(payload: UserInput): Promise<UserOutput> {
        const user = await UserRepository.getUserByEmail(payload.email);

        if (user) {
            throw new ConflictError('Email must be unique');
        }

        return UserRepository.createUser(payload);
    }
}

export default new AuthService();
