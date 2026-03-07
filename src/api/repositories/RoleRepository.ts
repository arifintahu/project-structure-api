import Role, { RoleInput, RoleOutput } from '../models/Role';
import { IRoleRepository } from './interfaces/IRoleRepository';

class RoleRepository implements IRoleRepository {
    createRole(payload: RoleInput): Promise<RoleOutput> {
        return Role.create(payload);
    }

    getRoles(): Promise<RoleOutput[]> {
        return Role.findAll();
    }

    getRoleBySlug(slug: string): Promise<RoleOutput | null> {
        return Role.findOne({
            where: {
                slug: slug
            }
        });
    }
}

export default new RoleRepository();
