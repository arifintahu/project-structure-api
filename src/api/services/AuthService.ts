import * as bcrypt from 'bcrypt';
import UserRepository from '../repositories/UserRepository';
import { UserInput } from '../models/User';
import JWT from '../../utils/jwt';

interface IAuthService {
    login(payload: UserInput): Promise<string>;
}

class AuthService implements IAuthService {
    userRepository: UserRepository;
    jwt: JWT;
    constructor() {
        this.userRepository = new UserRepository();
        this.jwt = new JWT();
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

        const token = await this.jwt.signToken(user.id);

        if (!token) {
            throw new Error('Invalid token');
        }

        return token;
    }
}

export default AuthService;