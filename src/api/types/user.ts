export type CreateUserType = {
    roleId?: number;
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
};

export type UpdateUserType = {
    roleId?: number;
    firstName: string;
    lastName: string;
};
