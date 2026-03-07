import UserRepository from '../UserRepository';
import User from '../../models/User';
import Role from '../../models/Role';
import mockResource from './mockResource';

jest.mock('bcrypt');
jest.mock('../../models/Role', () => {
    const MockRole: any = jest.fn();
    MockRole.init = jest.fn();
    MockRole.create = jest.fn();
    MockRole.findAll = jest.fn();
    MockRole.findOne = jest.fn();
    return { __esModule: true, default: MockRole };
});
jest.mock('../../models/User', () => {
    const MockUser: any = jest.fn();
    MockUser.init = jest.fn();
    MockUser.create = jest.fn();
    MockUser.findAll = jest.fn();
    MockUser.findAndCountAll = jest.fn();
    MockUser.findByPk = jest.fn();
    MockUser.findOne = jest.fn();
    MockUser.update = jest.fn();
    MockUser.destroy = jest.fn();
    MockUser.belongsTo = jest.fn();
    MockUser.beforeCreate = jest.fn();
    MockUser.beforeUpdate = jest.fn();
    return { __esModule: true, default: MockUser };
});

const MockedUser = jest.mocked(User);

describe('UserRepository', () => {
    describe('UserRepository.__createUser', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should return user created', async () => {
            //arrange
            const mockInput =
                mockResource.UserRepository.createUser.POSITIVE_CASE_INPUT;
            const mockOutput: any =
                mockResource.UserRepository.createUser.POSITIVE_CASE_OUTPUT;

            MockedUser.create.mockResolvedValue(mockOutput);

            //act
            const result = await UserRepository.createUser(mockInput);

            //assert
            expect(result).toEqual(mockOutput);
            expect(MockedUser.create).toHaveBeenCalledTimes(1);
            expect(MockedUser.create).toHaveBeenCalledWith(mockInput);
        });
    });

    describe('UserRepository.__getUsers', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should return paginated users', async () => {
            //arrange
            const mockRows: any =
                mockResource.UserRepository.getUsers.POSITIVE_CASE_OUTPUT;

            MockedUser.findAndCountAll.mockResolvedValue({
                rows: mockRows,
                count: mockRows.length
            } as any);

            //act
            const result = await UserRepository.getUsers({
                page: 1,
                limit: 10
            });

            //assert
            expect(result.items).toEqual(mockRows);
            expect(result.total).toBe(mockRows.length);
            expect(result.page).toBe(1);
            expect(result.limit).toBe(10);
            expect(result.totalPages).toBe(1);
            expect(MockedUser.findAndCountAll).toHaveBeenCalledTimes(1);
        });

        it('should use default pagination when no options provided', async () => {
            //arrange
            const mockRows: any =
                mockResource.UserRepository.getUsers.POSITIVE_CASE_OUTPUT;

            MockedUser.findAndCountAll.mockResolvedValue({
                rows: mockRows,
                count: mockRows.length
            } as any);

            //act
            const result = await UserRepository.getUsers();

            //assert
            expect(result.page).toBe(1);
            expect(result.limit).toBe(10);
            expect(MockedUser.findAndCountAll).toHaveBeenCalledTimes(1);
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
            const mockOutput: any =
                mockResource.UserRepository.getUserDetail.POSITIVE_CASE_OUTPUT;

            MockedUser.findByPk.mockResolvedValue(mockOutput);

            //act
            const result = await UserRepository.getUserDetail(mockInput.userId);

            //assert
            expect(result).toEqual(mockOutput);
            expect(MockedUser.findByPk).toHaveBeenCalledTimes(1);
            expect(MockedUser.findByPk).toHaveBeenCalledWith(
                mockInput.userId,
                expect.objectContaining({
                    attributes: expect.any(Array),
                    include: expect.any(Array)
                })
            );
        });
    });

    describe('UserRepository.__getUserByEmail', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should return user by email', async () => {
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
            expect(MockedUser.findOne).toHaveBeenCalledWith(mockModelOptions);
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
            const mockOutput =
                mockResource.UserRepository.updateUser.POSITIVE_CASE_OUTPUT;

            MockedUser.update.mockResolvedValue([1] as any);

            //act
            const result = await UserRepository.updateUser(
                mockInput.userId,
                mockInput.payload
            );

            //assert
            expect(result).toEqual(mockOutput);
            expect(MockedUser.update).toHaveBeenCalledTimes(1);
            expect(MockedUser.update).toHaveBeenCalledWith(
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
            const mockOutput =
                mockResource.UserRepository.deleteUser.POSITIVE_CASE_OUTPUT;

            MockedUser.destroy.mockResolvedValue(1 as any);

            //act
            const result = await UserRepository.deleteUser(mockInput.userId);

            //assert
            expect(result).toEqual(mockOutput);
            expect(MockedUser.destroy).toHaveBeenCalledTimes(1);
            expect(MockedUser.destroy).toHaveBeenCalledWith(mockModelOptions);
        });
    });
});
