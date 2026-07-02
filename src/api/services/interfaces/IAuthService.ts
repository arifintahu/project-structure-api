import { UserInput, UserOutput } from '../../models/User';

export interface IAuthService {
    login(payload: UserInput): Promise<string>;
    signUp(payload: UserInput): Promise<Omit<UserOutput, 'password'>>;
}
