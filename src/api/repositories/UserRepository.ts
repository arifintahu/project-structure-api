import User, { UserInput, UserInputUpdate, UserOutput } from '../models/User';
import Role from '../models/Role';

interface IUserRepository {
    createUser(payload: UserInput): Promise<UserOutput>;
    getUsers(): Promise<UserOutput[]>;
    getUserDetail(userId: number): Promise<UserOutput | null>;
    getUserByEmail(email: string): Promise<UserOutput | null>;
    updateUser(userId: number, payload: UserInputUpdate): Promise<boolean>;
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
        return User.findByPk(userId, {
            attributes: ['id', 'firstName', 'lastName', 'email'],
            include: [
                {
                    model: Role,
                    as: 'role',
                    required: false
                }
            ]
        });
    }

    getUserByEmail(email: string): Promise<UserOutput | null> {
        return User.findOne({
            where: {
                email: email
            }
        });
    }

    async updateUser(
        userId: number,
        payload: UserInputUpdate
    ): Promise<boolean> {
        const [updatedUserCount] = await User.update(payload, {
            where: {
                id: userId
            }
        });
        return !!updatedUserCount;
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
