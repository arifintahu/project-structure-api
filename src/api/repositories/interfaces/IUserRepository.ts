import { UserInput, UserInputUpdate, UserOutput } from '../../models/User';
import { PaginationOptions, PaginatedResult } from '../../types/pagination';

export interface IUserRepository {
    createUser(payload: UserInput): Promise<UserOutput>;
    getUsers(options?: PaginationOptions): Promise<PaginatedResult<UserOutput>>;
    getUserDetail(userId: number): Promise<UserOutput | null>;
    getUserByEmail(email: string): Promise<UserOutput | null>;
    updateUser(userId: number, payload: UserInputUpdate): Promise<boolean>;
    deleteUser(userId: number): Promise<boolean>;
}
