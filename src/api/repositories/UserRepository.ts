import { User } from '../models';
import { UserInput, UserOutput } from '../models/User';

interface IUserRepository {
    createUser(payload: UserInput): Promise<UserOutput>;
    getUsers(): Promise<UserOutput[]>;
    getUserDetail(userId: number): Promise<UserOutput | null>;
    getUserByEmail(email: string): Promise<UserOutput | null>;
    updateUser(userId: number, data: UserInput): Promise<UserOutput>;
    deleteUser(userId: number): Promise<boolean>;
}

class UserRepository implements IUserRepository {
    createUser(payload: UserInput): Promise<UserOutput> {
        return User.create(payload);
    }

    getUsers(): Promise<UserOutput[]> {
        return User.findAll({
            attributes: ['id', 'roleId', 'firstName', 'lastName', 'email']
        });
    }

    getUserDetail(userId: number): Promise<UserOutput | null> {
        return User.findByPk(userId);
    }

    getUserByEmail(email: string): Promise<UserOutput | null> {
        return User.findOne({
            where: {
                email: email
            }
        });
    }

    async updateUser(userId: number, payload: UserInput): Promise<UserOutput> {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new Error('User not found');
        }

        return user.update(payload);
    }

    async deleteUser(userId: number): Promise<boolean> {
        const deletedUserCount = await User.destroy({
            where: {
                id: userId
            }
        });
        return !!deletedUserCount;
    }
}

export default new UserRepository();
