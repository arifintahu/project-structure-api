import * as bcrypt from 'bcrypt';
import UserRepository from '../repositories/UserRepository';
import { UserInput } from '../models/User';
import { signToken } from '../../utils/jwt';

interface IAuthService {
    login(payload: UserInput): Promise<string>;
}

class AuthService implements IAuthService {
    userRepository: UserRepository;
    signToken: typeof signToken;
    constructor() {
        this.userRepository = new UserRepository();
        this.signToken = signToken;
    }

    async login(payload: UserInput): Promise<string> {
        const user = await this.userRepository.getUserByEmail(payload.email);

        if (!user) {
            throw new Error('User not found');
        }

        const isValid = bcrypt.compareSync(payload.password, user.password);

        if (!isValid) {
            throw new Error('Email and Password is not match');
        }

        const token = await this.signToken(user.id);

        if (!token) {
            throw new Error('Invalid token');
        }

        return token;
    }
}

export default AuthService;
