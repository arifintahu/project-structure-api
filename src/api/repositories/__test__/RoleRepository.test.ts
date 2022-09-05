import RoleRepository from '../RoleRepository';
import Role from '../../models/Role';
import mockResource from './mockResource';

jest.mock('../../models/Role');

const MockedRole = jest.mocked(Role, true);

describe('RoleRepository', () => {
    describe('RoleRepository.__createRole', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should return role created', async () => {
            //arrange
            const mockInput =
                mockResource.RoleRepository.createRole.POSITIVE_CASE_INPUT;
            const mockOutput =
                mockResource.RoleRepository.createRole.POSITIVE_CASE_OUTPUT;

            MockedRole.create.mockResolvedValue(mockOutput);

            //act
            const result = await RoleRepository.createRole(mockInput);

            //assert
            expect(result).toEqual(mockOutput);
            expect(MockedRole.create).toHaveBeenCalledTimes(1);
            expect(MockedRole.create).toBeCalledWith(mockInput);
        });
    });

    describe('RoleRepository.__getRoles', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should return list roles', async () => {
            //arrange
            const mockOutput: any =
                mockResource.RoleRepository.getRoles.POSITIVE_CASE_OUTPUT;

            MockedRole.findAll.mockResolvedValue(mockOutput);

            //act
            const result = await RoleRepository.getRoles();

            //assert
            expect(result).toEqual(mockOutput);
            expect(MockedRole.findAll).toHaveBeenCalledTimes(1);
            expect(MockedRole.findAll).toBeCalledWith();
        });
    });

    describe('RoleRepository.__getRoleBySlug', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should return role detail', async () => {
            //arrange
            const mockInput =
                mockResource.RoleRepository.getRoleBySlug.POSITIVE_CASE_INPUT;
            const mockModelOptions =
                mockResource.RoleRepository.getRoleBySlug.MODEL_OPTIONS;
            const mockOutput: any =
                mockResource.RoleRepository.getRoleBySlug.POSITIVE_CASE_OUTPUT;

            MockedRole.findOne.mockResolvedValue(mockOutput);

            //act
            const result = await RoleRepository.getRoleBySlug(mockInput.slug);

            //assert
            expect(result).toEqual(mockOutput);
            expect(MockedRole.findOne).toHaveBeenCalledTimes(1);
            expect(MockedRole.findOne).toBeCalledWith(mockModelOptions);
        });
    });
});
