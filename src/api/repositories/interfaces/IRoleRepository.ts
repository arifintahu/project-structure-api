import { RoleInput, RoleOutput } from '../../models/Role';

export interface IRoleRepository {
    createRole(payload: RoleInput): Promise<RoleOutput>;
    getRoles(): Promise<RoleOutput[]>;
    getRoleBySlug(slug: string): Promise<RoleOutput | null>;
}
