import { RoleInput, RoleOutput } from '../../models/Role';

export interface IRoleService {
    createRole(payload: RoleInput): Promise<RoleOutput>;
    getRoles(): Promise<RoleOutput[]>;
}
