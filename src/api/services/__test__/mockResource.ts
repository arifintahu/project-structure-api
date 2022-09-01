const mockResource = {
    RoleService: {
        createRole: {
            POSITIVE_CASE_INPUT: {
                name: 'Admin',
                description: 'Admin'
            },
            SLUGIFY_OUTPUT: 'admin',
            POSITIVE_CASE_OUTPUT: {
                id: 1,
                name: 'Admin',
                description: 'Admin',
                slug: 'admin',
                createdAt: '2022-08-26 14:40:19',
                updatedAt: '2022-08-26 14:40:19',
                deletedAt: null
            },
            CASE_NULL_ROLE_SLUG: null,
            CASE_EXIST_ROLE_SLUG: {
                id: 1,
                name: 'Admin',
                description: 'Admin',
                slug: 'admin',
                createdAt: '2022-08-26 14:40:19',
                updatedAt: '2022-08-26 14:40:19',
                deletedAt: null
            },
            ERROR_MESSAGE: 'Role is exist'
        },
        getRoles: {
            POSITIVE_CASE_OUTPUT: [
                {
                    id: 1,
                    name: 'Admin',
                    description: 'Admin',
                    slug: 'admin',
                    createdAt: '2022-08-26 14:40:19',
                    updatedAt: '2022-08-26 14:40:19',
                    deletedAt: null
                }
            ]
        }
    }
};

export default mockResource;
