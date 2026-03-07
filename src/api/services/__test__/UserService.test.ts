import UserService from '../UserService';
import UserRepository from '../../repositories/UserRepository';
import mockResource from './mockResource';
import bcrypt from 'bcrypt';

jest.mock('../../repositories/UserRepository');
jest.mock('bcrypt');

const MockedUserRepository = jest.mocked(UserRepository);
const MockedBcrypt = jest.mocked(bcrypt);

describe('UserService', () => {
    describe('UserService.__createUser', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should return user created', async () => {
            //arrange
            const mockInput =
                mockResource.UserService.createUser.POSITIVE_CASE_INPUT;
            const mockOutputBcryptHash =
                mockResource.UserService.createUser.BCRYPT_HASH_OUTPUT;
            const mockOutputUserEmail =
                mockResource.UserService.createUser.CASE_NULL_USER_EMAIL;
            const mockOutput: any =
                mockResource.UserService.createUser.POSITIVE_CASE_OUTPUT;

            MockedUserRepository.getUserByEmail.mockResolvedValue(
                mockOutputUserEmail
            );
            MockedBcrypt.hash.mockResolvedValue(mockOutputBcryptHash as never);
            MockedUserRepository.createUser.mockResolvedValue(mockOutput);

            //act
            const result = await UserService.createUser(mockInput);

            //assert
            expect(result).toEqual(mockOutput);
            expect(MockedUserRepository.getUserByEmail).toHaveBeenCalledTimes(
                1
            );
            expect(MockedUserRepository.getUserByEmail).toHaveBeenCalledWith(
                mockInput.email
            );

            expect(MockedBcrypt.hash).toHaveBeenCalledTimes(1);
            expect(MockedBcrypt.hash).toHaveBeenCalledWith(
                mockInput.password,
                10
            );

            expect(MockedUserRepository.createUser).toHaveBeenCalledTimes(1);
            expect(MockedUserRepository.createUser).toHaveBeenCalledWith({
                ...mockInput,
                password: mockOutputBcryptHash
            });
        });

        it('should return error user exist', () => {
            //arrange
            const mockInput =
                mockResource.UserService.createUser.POSITIVE_CASE_INPUT;
            const mockOutputUserEmail: any =
                mockResource.UserService.createUser.CASE_EXIST_USER_EMAIL;
            const errorMessage =
                mockResource.UserService.createUser.ERROR_MESSAGE;

            MockedUserRepository.getUserByEmail.mockResolvedValue(
                mockOutputUserEmail
            );

            //act
            const result = UserService.createUser(mockInput);

            //assert
            expect(result).rejects.toThrowError(errorMessage);

            expect(MockedUserRepository.getUserByEmail).toHaveBeenCalledTimes(
                1
            );
            expect(MockedUserRepository.getUserByEmail).toHaveBeenCalledWith(
                mockInput.email
            );
        });
    });

    describe('UserService.__getUsers', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should return list users', async () => {
            //arrange
            const mockOutput: any =
                mockResource.UserService.getUsers.POSITIVE_CASE_OUTPUT;

            MockedUserRepository.getUsers.mockResolvedValue(mockOutput);

            //act
            const result = await UserService.getUsers();

            //assert
            expect(result).toEqual(mockOutput);
            expect(MockedUserRepository.getUsers).toHaveBeenCalledTimes(1);
            expect(MockedUserRepository.getUsers).toHaveBeenCalledWith();
        });
    });

    describe('UserService.__getUserDetail', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should return user detail', async () => {
            //arrange
            const mockInput =
                mockResource.UserService.getUserDetail.POSITIVE_CASE_INPUT;
            const mockOutput: any =
                mockResource.UserService.getUserDetail.POSITIVE_CASE_OUTPUT;

            MockedUserRepository.getUserDetail.mockResolvedValue(mockOutput);

            //act
            const result = await UserService.getUserDetail(mockInput.userId);

            //assert
            expect(result).toEqual(mockOutput);
            expect(MockedUserRepository.getUserDetail).toHaveBeenCalledTimes(1);
            expect(MockedUserRepository.getUserDetail).toHaveBeenCalledWith(
                mockInput.userId
            );
        });

        it('should return error user not found', () => {
            //arrange
            const mockInput =
                mockResource.UserService.getUserDetail.POSITIVE_CASE_INPUT;
            const mockOutput =
                mockResource.UserService.getUserDetail.CASE_NULL_OUPUT;
            const errorMessage =
                mockResource.UserService.getUserDetail.ERROR_MESSAGE;

            MockedUserRepository.getUserDetail.mockResolvedValue(mockOutput);

            //act
            const result = UserService.getUserDetail(mockInput.userId);

            //assert
            expect(result).rejects.toThrowError(errorMessage);
            expect(MockedUserRepository.getUserDetail).toHaveBeenCalledTimes(1);
            expect(MockedUserRepository.getUserDetail).toHaveBeenCalledWith(
                mockInput.userId
            );
        });
    });

    describe('UserService.__updateUser', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should return success update user', async () => {
            //arrange
            const mockInput =
                mockResource.UserService.updateUser.POSITIVE_CASE_INPUT;
            const mockOutputDetail: any =
                mockResource.UserService.updateUser.CASE_EXIST_DETAIL;
            const mockOutput =
                mockResource.UserService.updateUser.POSITIVE_CASE_OUTPUT;

            MockedUserRepository.getUserDetail.mockResolvedValue(
                mockOutputDetail
            );
            MockedUserRepository.updateUser.mockResolvedValue(mockOutput);

            //act
            const result = await UserService.updateUser(
                mockInput.userId,
                mockInput.payload
            );

            //assert
            expect(result).toEqual(mockOutput);
            expect(MockedUserRepository.getUserDetail).toHaveBeenCalledTimes(1);
            expect(MockedUserRepository.getUserDetail).toHaveBeenCalledWith(
                mockInput.userId
            );

            expect(MockedUserRepository.updateUser).toHaveBeenCalledTimes(1);
            expect(MockedUserRepository.updateUser).toHaveBeenCalledWith(
                mockInput.userId,
                mockInput.payload
            );
        });

        it('should return error user not found', () => {
            //arrange
            const mockInput =
                mockResource.UserService.updateUser.POSITIVE_CASE_INPUT;
            const mockOutputDetail =
                mockResource.UserService.updateUser.CASE_NULL_DETAIL;
            const errorMessage =
                mockResource.UserService.updateUser.ERROR_MESSAGE;

            MockedUserRepository.getUserDetail.mockResolvedValue(
                mockOutputDetail
            );

            //act
            const result = UserService.updateUser(
                mockInput.userId,
                mockInput.payload
            );

            //assert
            expect(result).rejects.toThrowError(errorMessage);
            expect(MockedUserRepository.getUserDetail).toHaveBeenCalledTimes(1);
            expect(MockedUserRepository.getUserDetail).toHaveBeenCalledWith(
                mockInput.userId
            );
        });
    });

    describe('UserService.__deleteUser', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should return success delete user', async () => {
            //arrange
            const mockInput =
                mockResource.UserService.deleteUser.POSITIVE_CASE_INPUT;
            const mockOutputDetail: any =
                mockResource.UserService.deleteUser.CASE_EXIST_DETAIL;
            const mockOutput =
                mockResource.UserService.deleteUser.POSITIVE_CASE_OUTPUT;

            MockedUserRepository.getUserDetail.mockResolvedValue(
                mockOutputDetail
            );
            MockedUserRepository.deleteUser.mockResolvedValue(mockOutput);

            //act
            const result = await UserService.deleteUser(mockInput.userId);

            //assert
            expect(result).toEqual(mockOutput);
            expect(MockedUserRepository.getUserDetail).toHaveBeenCalledTimes(1);
            expect(MockedUserRepository.getUserDetail).toHaveBeenCalledWith(
                mockInput.userId
            );

            expect(MockedUserRepository.deleteUser).toHaveBeenCalledTimes(1);
            expect(MockedUserRepository.deleteUser).toHaveBeenCalledWith(
                mockInput.userId
            );
        });

        it('should return error user not found', () => {
            //arrange
            const mockInput =
                mockResource.UserService.deleteUser.POSITIVE_CASE_INPUT;
            const mockOutputDetail =
                mockResource.UserService.deleteUser.CASE_NULL_DETAIL;
            const errorMessage =
                mockResource.UserService.deleteUser.ERROR_MESSAGE;

            MockedUserRepository.getUserDetail.mockResolvedValue(
                mockOutputDetail
            );

            //act
            const result = UserService.deleteUser(mockInput.userId);

            //assert
            expect(result).rejects.toThrowError(errorMessage);
            expect(MockedUserRepository.getUserDetail).toHaveBeenCalledTimes(1);
            expect(MockedUserRepository.getUserDetail).toHaveBeenCalledWith(
                mockInput.userId
            );
        });
    });
});
