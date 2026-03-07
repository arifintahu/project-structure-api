import RoleService from '../RoleService';
import RoleRepository from '../../repositories/RoleRepository';
import { slugify } from '../../../utils/helpers';
import mockResource from './mockResource';

jest.mock('../../repositories/RoleRepository');
jest.mock('../../../utils/helpers');

const MockedRoleRepository = jest.mocked(RoleRepository);
const MockedSlugify = jest.mocked(slugify);

describe('RoleService', () => {
    describe('RoleService.__createRole', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should return role created', async () => {
            //arrange
            const mockInput =
                mockResource.RoleService.createRole.POSITIVE_CASE_INPUT;
            const mockOutputSlugify =
                mockResource.RoleService.createRole.SLUGIFY_OUTPUT;
            const mockOutputRoleSlug =
                mockResource.RoleService.createRole.CASE_NULL_ROLE_SLUG;
            const mockOutput: any =
                mockResource.RoleService.createRole.POSITIVE_CASE_OUTPUT;

            MockedSlugify.mockReturnValue(mockOutputSlugify);
            MockedRoleRepository.getRoleBySlug.mockResolvedValue(
                mockOutputRoleSlug
            );
            MockedRoleRepository.createRole.mockResolvedValue(mockOutput);

            //act
            const result = await RoleService.createRole(mockInput);

            //assert
            expect(result).toEqual(mockOutput);
            expect(MockedSlugify).toHaveBeenCalledTimes(1);
            expect(MockedSlugify).toHaveBeenCalledWith(mockInput.name);

            expect(MockedRoleRepository.getRoleBySlug).toHaveBeenCalledTimes(1);
            expect(MockedRoleRepository.getRoleBySlug).toHaveBeenCalledWith(
                mockOutputSlugify
            );

            expect(MockedRoleRepository.createRole).toHaveBeenCalledWith({
                ...mockInput,
                slug: mockOutputSlugify
            });
        });

        it('should return error role exist', () => {
            //arrange
            const mockInput =
                mockResource.RoleService.createRole.POSITIVE_CASE_INPUT;
            const mockOutputSlugify =
                mockResource.RoleService.createRole.SLUGIFY_OUTPUT;
            const mockOutputRoleSlug: any =
                mockResource.RoleService.createRole.CASE_EXIST_ROLE_SLUG;
            const errorMessage =
                mockResource.RoleService.createRole.ERROR_MESSAGE;

            MockedSlugify.mockReturnValue(mockOutputSlugify);
            MockedRoleRepository.getRoleBySlug.mockResolvedValue(
                mockOutputRoleSlug
            );

            //act
            const result = RoleService.createRole(mockInput);

            //assert
            expect(result).rejects.toThrow(errorMessage);
            expect(MockedSlugify).toHaveBeenCalledTimes(1);
            expect(MockedSlugify).toHaveBeenCalledWith(mockInput.name);

            expect(MockedRoleRepository.getRoleBySlug).toHaveBeenCalledTimes(1);
            expect(MockedRoleRepository.getRoleBySlug).toHaveBeenCalledWith(
                mockOutputSlugify
            );
        });
    });

    describe('RoleService.__getRoles', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should return list roles', async () => {
            //arrange
            const mockOutput: any =
                mockResource.RoleService.getRoles.POSITIVE_CASE_OUTPUT;

            MockedRoleRepository.getRoles.mockResolvedValue(mockOutput);

            //act
            const result = await RoleService.getRoles();

            //assert
            expect(result).toEqual(mockOutput);
            expect(MockedRoleRepository.getRoles).toHaveBeenCalledTimes(1);
            expect(MockedRoleRepository.getRoles).toHaveBeenCalledWith();
        });
    });
});
