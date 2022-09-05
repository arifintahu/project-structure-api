import UserRepository from '../UserRepository';
import User from '../../models/User';
import Role from '../../models/Role';
import mockResource from './mockResource';

jest.mock('../../models/User');

const MockedUser = jest.mocked(User, true);

describe('UserRepository', () => {
    describe('UserRepository.__createUser', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should return user created', async () => {
            //arrange
            const mockInput =
                mockResource.UserRepository.createUser.POSITIVE_CASE_INPUT;
            const mockOutput =
                mockResource.UserRepository.createUser.POSITIVE_CASE_OUTPUT;

            MockedUser.create.mockResolvedValue(mockOutput);

            //act
            const result = await UserRepository.createUser(mockInput);

            //assert
            expect(result).toEqual(mockOutput);
            expect(MockedUser.create).toHaveBeenCalledTimes(1);
            expect(MockedUser.create).toBeCalledWith(mockInput);
        });
    });

    describe('UserRepository.__getUsers', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should return list users', async () => {
            //arrange
            const mockModelOptions =
                mockResource.UserRepository.getUsers.MODEL_OPTIONS;
            const mockOutput: any =
                mockResource.UserRepository.getUsers.POSITIVE_CASE_OUTPUT;

            MockedUser.findAll.mockResolvedValue(mockOutput);

            //act
            const result = await UserRepository.getUsers();

            //assert
            expect(result).toEqual(mockOutput);
            expect(MockedUser.findAll).toHaveBeenCalledTimes(1);
            expect(MockedUser.findAll).toBeCalledWith(mockModelOptions);
        });
    });

    describe('UserRepository.__getUserDetail', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should return user detail', async () => {
            //arrange
            const mockInput =
                mockResource.UserRepository.getUserDetail.POSITIVE_CASE_INPUT;
            const mockModelOptions =
                mockResource.UserRepository.getUserDetail.MODEL_OPTIONS;
            const mockOutput: any =
                mockResource.UserRepository.getUserDetail.POSITIVE_CASE_OUTPUT;

            MockedUser.findByPk.mockResolvedValue(mockOutput);

            //act
            const result = await UserRepository.getUserDetail(mockInput.userId);

            //assert
            expect(result).toEqual(mockOutput);
            expect(MockedUser.findByPk).toHaveBeenCalledTimes(1);
            expect(MockedUser.findByPk).toBeCalledWith(mockInput.userId, {
                ...mockModelOptions,
                include: [
                    {
                        model: Role,
                        as: 'role',
                        required: false
                    }
                ]
            });
        });
    });

    describe('UserRepository.__getUserByEmail', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should return user detail', async () => {
            //arrange
            const mockInput =
                mockResource.UserRepository.getUserByEmail.POSITIVE_CASE_INPUT;
            const mockModelOptions =
                mockResource.UserRepository.getUserByEmail.MODEL_OPTIONS;
            const mockOutput: any =
                mockResource.UserRepository.getUserByEmail.POSITIVE_CASE_OUTPUT;

            MockedUser.findOne.mockResolvedValue(mockOutput);

            //act
            const result = await UserRepository.getUserByEmail(mockInput.email);

            //assert
            expect(result).toEqual(mockOutput);
            expect(MockedUser.findOne).toHaveBeenCalledTimes(1);
            expect(MockedUser.findOne).toBeCalledWith(mockModelOptions);
        });
    });

    describe('UserRepository.__updateUser', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should return update success', async () => {
            //arrange
            const mockInput =
                mockResource.UserRepository.updateUser.POSITIVE_CASE_INPUT;
            const mockModelOptions =
                mockResource.UserRepository.updateUser.MODEL_OPTIONS;
            const mockModelOutput: any =
                mockResource.UserRepository.updateUser.POSITIVE_MODEL_OUTPUT;
            const mockOutput =
                mockResource.UserRepository.updateUser.POSITIVE_CASE_OUTPUT;

            MockedUser.update.mockResolvedValue(mockModelOutput);

            //act
            const result = await UserRepository.updateUser(
                mockInput.userId,
                mockInput.payload
            );

            //assert
            expect(result).toEqual(mockOutput);
            expect(MockedUser.update).toHaveBeenCalledTimes(1);
            expect(MockedUser.update).toBeCalledWith(
                mockInput.payload,
                mockModelOptions
            );
        });
    });

    describe('UserRepository.__deleteUser', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should return delete success', async () => {
            //arrange
            const mockInput =
                mockResource.UserRepository.deleteUser.POSITIVE_CASE_INPUT;
            const mockModelOptions =
                mockResource.UserRepository.deleteUser.MODEL_OPTIONS;
            const mockModelOutput: any =
                mockResource.UserRepository.deleteUser.POSITIVE_MODEL_OUTPUT;
            const mockOutput =
                mockResource.UserRepository.deleteUser.POSITIVE_CASE_OUTPUT;

            MockedUser.destroy.mockResolvedValue(mockModelOutput);

            //act
            const result = await UserRepository.deleteUser(mockInput.userId);

            //assert
            expect(result).toEqual(mockOutput);
            expect(MockedUser.destroy).toHaveBeenCalledTimes(1);
            expect(MockedUser.destroy).toBeCalledWith(mockModelOptions);
        });
    });
});
