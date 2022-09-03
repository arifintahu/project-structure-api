import AuthService from '../AuthService';
import UserRepository from '../../repositories/UserRepository';
import mockResource from './mockResource';
import * as bcrypt from 'bcrypt';
import JWT from '../../../utils/jwt';

jest.mock('../../repositories/UserRepository');
jest.mock('../../../utils/jwt');
jest.mock('bcrypt');

const MockedUserRepository = jest.mocked(UserRepository, true);
const MockedBycrypt = jest.mocked(bcrypt, true);
const MockedJWT = jest.mocked(JWT, true);

describe('AuthService', () => {
    describe('AuthService.__login', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should return success login', async () => {
            //arrange
            const mockInput =
                mockResource.AuthService.login.POSITIVE_CASE_INPUT;
            const mockUserEmailOutput: any =
                mockResource.AuthService.login.CASE_EXIST_USER_EMAIL;
            const mockCompareOutput =
                mockResource.AuthService.login.CASE_VALID_COMPARE;
            const mockTokenOutput =
                mockResource.AuthService.login.CASE_VALID_TOKEN;

            MockedUserRepository.getUserByEmail.mockResolvedValue(
                mockUserEmailOutput
            );
            MockedBycrypt.compareSync.mockReturnValue(mockCompareOutput);
            MockedJWT.signToken.mockResolvedValue(mockTokenOutput);

            //act
            const result = await AuthService.login(mockInput);

            //assert
            expect(result).toEqual(mockTokenOutput);
            expect(MockedUserRepository.getUserByEmail).toHaveBeenCalledTimes(
                1
            );
            expect(MockedUserRepository.getUserByEmail).toBeCalledWith(
                mockInput.email
            );

            expect(MockedBycrypt.compareSync).toHaveBeenCalledTimes(1);
            expect(MockedBycrypt.compareSync).toBeCalledWith(
                mockInput.password,
                mockUserEmailOutput.password
            );

            expect(MockedJWT.signToken).toHaveBeenCalledTimes(1);
            expect(MockedJWT.signToken).toBeCalledWith(mockUserEmailOutput.id);
        });

        it('should return error user not found', () => {
            //arrange
            const mockInput =
                mockResource.AuthService.login.POSITIVE_CASE_INPUT;
            const mockUserEmailOutput: any =
                mockResource.AuthService.login.CASE_NULL_USER_EMAIL;
            const errorMessage =
                mockResource.AuthService.login.ERR_USER_NOT_FOUND;

            MockedUserRepository.getUserByEmail.mockResolvedValue(
                mockUserEmailOutput
            );

            //act
            const result = AuthService.login(mockInput);

            //assert
            expect(result).rejects.toThrowError(errorMessage);
            expect(MockedUserRepository.getUserByEmail).toHaveBeenCalledTimes(
                1
            );
            expect(MockedUserRepository.getUserByEmail).toBeCalledWith(
                mockInput.email
            );
        });

        it('should return error invalid email and password', () => {
            //arrange
            const mockInput =
                mockResource.AuthService.login.POSITIVE_CASE_INPUT;
            const mockUserEmailOutput: any =
                mockResource.AuthService.login.CASE_EXIST_USER_EMAIL;
            const mockCompareOutput =
                mockResource.AuthService.login.CASE_INVALID_COMPARE;
            const errorMessage =
                mockResource.AuthService.login.ERR_INVALID_PASSWORD;

            MockedUserRepository.getUserByEmail.mockResolvedValue(
                mockUserEmailOutput
            );
            MockedBycrypt.compareSync.mockReturnValue(mockCompareOutput);

            //act
            const result = AuthService.login(mockInput);

            //assert
            expect(result).rejects.toThrowError(errorMessage);
            expect(MockedUserRepository.getUserByEmail).toHaveBeenCalledTimes(
                1
            );
            expect(MockedUserRepository.getUserByEmail).toBeCalledWith(
                mockInput.email
            );
        });

        it('should return error invalid token', () => {
            //arrange
            const mockInput =
                mockResource.AuthService.login.POSITIVE_CASE_INPUT;
            const mockUserEmailOutput: any =
                mockResource.AuthService.login.CASE_EXIST_USER_EMAIL;
            const mockCompareOutput =
                mockResource.AuthService.login.CASE_VALID_COMPARE;
            const mockTokenOutput =
                mockResource.AuthService.login.CASE_UNDEFINED_TOKEN;
            const errorMessage =
                mockResource.AuthService.login.ERR_INVALID_TOKEN;

            MockedUserRepository.getUserByEmail.mockResolvedValue(
                mockUserEmailOutput
            );
            MockedBycrypt.compareSync.mockReturnValue(mockCompareOutput);
            MockedJWT.signToken.mockResolvedValue(mockTokenOutput);

            //act
            const result = AuthService.login(mockInput);

            //assert
            expect(result).rejects.toThrowError(errorMessage);
            expect(MockedUserRepository.getUserByEmail).toHaveBeenCalledTimes(
                1
            );
            expect(MockedUserRepository.getUserByEmail).toBeCalledWith(
                mockInput.email
            );
        });
    });

    describe('AuthService.__signUp', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should return success login', async () => {
            //arrange
            const mockInput =
                mockResource.AuthService.signUp.POSITIVE_CASE_INPUT;
            const mockUserEmailOutput =
                mockResource.AuthService.signUp.CASE_NULL_USER_EMAIL;
            const mockHashOutput =
                mockResource.AuthService.signUp.BCRYPT_HASH_OUTPUT;
            const mockOutput: any =
                mockResource.AuthService.signUp.POSITIVE_CASE_OUTPUT;

            MockedUserRepository.getUserByEmail.mockResolvedValue(
                mockUserEmailOutput
            );
            MockedBycrypt.hashSync.mockReturnValue(mockHashOutput);
            MockedUserRepository.createUser.mockResolvedValue(mockOutput);

            //act
            const result = await AuthService.signUp(mockInput);

            //assert
            expect(result).toEqual(mockOutput);
            expect(MockedUserRepository.getUserByEmail).toHaveBeenCalledTimes(
                1
            );
            expect(MockedUserRepository.getUserByEmail).toBeCalledWith(
                mockInput.email
            );

            expect(MockedBycrypt.hashSync).toHaveBeenCalledTimes(1);
            expect(MockedBycrypt.hashSync).toBeCalledWith(
                mockInput.password,
                5
            );

            expect(MockedUserRepository.createUser).toHaveBeenCalledTimes(1);
            expect(MockedUserRepository.createUser).toBeCalledWith({
                ...mockInput,
                password: mockHashOutput
            });
        });

        it('should return error email exist', () => {
            //arrange
            const mockInput =
                mockResource.AuthService.signUp.POSITIVE_CASE_INPUT;
            const mockUserEmailOutput: any =
                mockResource.AuthService.signUp.CASE_EXIST_USER_EMAIL;
            const errorMessage = mockResource.AuthService.signUp.ERROR_MESSAGE;

            MockedUserRepository.getUserByEmail.mockResolvedValue(
                mockUserEmailOutput
            );

            //act
            const result = AuthService.signUp(mockInput);

            //assert
            expect(result).rejects.toThrowError(errorMessage);
            expect(MockedUserRepository.getUserByEmail).toHaveBeenCalledTimes(
                1
            );
            expect(MockedUserRepository.getUserByEmail).toBeCalledWith(
                mockInput.email
            );
        });
    });
});
