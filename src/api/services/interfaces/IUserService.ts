import { UserInput, UserInputUpdate, UserOutput } from '../../models/User';
import { PaginationOptions, PaginatedResult } from '../../types/pagination';

export interface IUserService {
    createUser(payload: UserInput): Promise<UserOutput>;
    getUsers(options?: PaginationOptions): Promise<PaginatedResult<UserOutput>>;
    getUserDetail(userId: number): Promise<UserOutput>;
    updateUser(userId: number, data: UserInputUpdate): Promise<boolean>;
    deleteUser(userId: number): Promise<boolean>;
}
