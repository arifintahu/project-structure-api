import { Role } from '../models';
import { RoleInput, RoleOutput } from '../models/Role';

interface IRoleRepository {
    createRole(payload: RoleInput): Promise<RoleOutput>;
    getRoles(): Promise<RoleOutput[]>;
}

class RoleRepository implements IRoleRepository {
    createRole(payload: RoleInput): Promise<RoleOutput> {
        return Role.create(payload);
    }

    getRoles(): Promise<RoleOutput[]> {
        return Role.findAll();
    }
}

export default new RoleRepository();
