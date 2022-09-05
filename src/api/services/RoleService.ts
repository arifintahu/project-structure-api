import RoleRepository from '../repositories/RoleRepository';
import { RoleInput, RoleOutput } from '../models/Role';
import { slugify } from '../../utils/helpers';

interface IRoleService {
    createRole(payload: RoleInput): Promise<RoleOutput>;
    getRoles(): Promise<RoleOutput[]>;
}

class RoleService implements IRoleService {
    async createRole(payload: RoleInput): Promise<RoleOutput> {
        const slug = slugify(payload.name);
        const role = await RoleRepository.getRoleBySlug(slug);

        if (role) {
            throw new Error('Role is exist');
        }

        return RoleRepository.createRole({
            ...payload,
            slug
        });
    }

    getRoles(): Promise<RoleOutput[]> {
        return RoleRepository.getRoles();
    }
}

export default new RoleService();
