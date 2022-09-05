const mockResource = {
    AuthService: {
        login: {
            POSITIVE_CASE_INPUT: {
                email: 'user@mail.com',
                password: 'password'
            },
            CASE_NULL_USER_EMAIL: null,
            CASE_EXIST_USER_EMAIL: {
                id: 1,
                email: 'user@mail.com',
                password:
                    '$2b$05$bnaCGMUl/IYffmo9zku7c.AVDpdkJZPt.ZEIXsKULeQglPDyRU7Di',
                firstName: 'John',
                lastName: 'Doe',
                roleId: 1,
                createdAt: '2022-08-26 14:40:19',
                updatedAt: '2022-08-26 14:40:19',
                deletedAt: null
            },
            CASE_VALID_COMPARE: true,
            CASE_INVALID_COMPARE: false,
            CASE_VALID_TOKEN: 'abc',
            CASE_UNDEFINED_TOKEN: undefined,
            ERR_USER_NOT_FOUND: 'User not found',
            ERR_INVALID_PASSWORD: 'Email and Password is not match',
            ERR_INVALID_TOKEN: 'Invalid token'
        },
        signUp: {
            POSITIVE_CASE_INPUT: {
                email: 'user@mail.com',
                password: 'password',
                firstName: 'John',
                lastName: 'Doe'
            },
            CASE_NULL_USER_EMAIL: null,
            CASE_EXIST_USER_EMAIL: {
                id: 1,
                email: 'user@mail.com',
                password:
                    '$2b$05$bnaCGMUl/IYffmo9zku7c.AVDpdkJZPt.ZEIXsKULeQglPDyRU7Di',
                firstName: 'John',
                lastName: 'Doe',
                roleId: 1,
                createdAt: '2022-08-26 14:40:19',
                updatedAt: '2022-08-26 14:40:19',
                deletedAt: null
            },
            BCRYPT_HASH_OUTPUT:
                '$2b$05$bnaCGMUl/IYffmo9zku7c.AVDpdkJZPt.ZEIXsKULeQglPDyRU7Di',
            POSITIVE_CASE_OUTPUT: {
                id: 1,
                email: 'user@mail.com',
                password:
                    '$2b$05$bnaCGMUl/IYffmo9zku7c.AVDpdkJZPt.ZEIXsKULeQglPDyRU7Di',
                firstName: 'John',
                lastName: 'Doe',
                roleId: 1,
                createdAt: '2022-08-26 14:40:19',
                updatedAt: '2022-08-26 14:40:19',
                deletedAt: null
            },
            ERROR_MESSAGE: 'Email must be unique'
        }
    },
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
    },
    UserService: {
        createUser: {
            POSITIVE_CASE_INPUT: {
                email: 'user@mail.com',
                password: 'password',
                firstName: 'John',
                lastName: 'Doe',
                roleId: 1
            },
            CASE_NULL_USER_EMAIL: null,
            CASE_EXIST_USER_EMAIL: {
                id: 1,
                email: 'user@mail.com',
                password:
                    '$2b$05$bnaCGMUl/IYffmo9zku7c.AVDpdkJZPt.ZEIXsKULeQglPDyRU7Di',
                firstName: 'John',
                lastName: 'Doe',
                roleId: 1,
                createdAt: '2022-08-26 14:40:19',
                updatedAt: '2022-08-26 14:40:19',
                deletedAt: null
            },
            BCRYPT_HASH_OUTPUT:
                '$2b$05$bnaCGMUl/IYffmo9zku7c.AVDpdkJZPt.ZEIXsKULeQglPDyRU7Di',
            POSITIVE_CASE_OUTPUT: {
                id: 1,
                email: 'user@mail.com',
                password:
                    '$2b$05$bnaCGMUl/IYffmo9zku7c.AVDpdkJZPt.ZEIXsKULeQglPDyRU7Di',
                firstName: 'John',
                lastName: 'Doe',
                roleId: 1,
                createdAt: '2022-08-26 14:40:19',
                updatedAt: '2022-08-26 14:40:19',
                deletedAt: null
            },
            ERROR_MESSAGE: 'Email must be unique'
        },
        getUsers: {
            POSITIVE_CASE_OUTPUT: [
                {
                    id: 1,
                    email: 'user@mail.com',
                    firstName: 'John',
                    lastName: 'Doe',
                    roleId: 1
                }
            ]
        },
        getUserDetail: {
            POSITIVE_CASE_INPUT: {
                userId: 1
            },
            POSITIVE_CASE_OUTPUT: {
                id: 1,
                email: 'user@mail.com',
                firstName: 'John',
                lastName: 'Doe',
                role: {
                    id: 1,
                    name: 'Admin',
                    description: 'Admin',
                    slug: 'admin',
                    createdAt: '2022-08-26 14:40:19',
                    updatedAt: '2022-08-26 14:40:19',
                    deletedAt: null
                }
            },
            CASE_NULL_OUPUT: null,
            ERROR_MESSAGE: 'User not found'
        },
        updateUser: {
            POSITIVE_CASE_INPUT: {
                userId: 1,
                payload: {
                    firstName: 'John',
                    lastName: 'Doe',
                    roleId: 2
                }
            },
            CASE_EXIST_DETAIL: {
                id: 1,
                email: 'user@mail.com',
                firstName: 'John',
                lastName: 'Doe',
                role: {
                    id: 1,
                    name: 'Admin',
                    description: 'Admin',
                    slug: 'admin',
                    createdAt: '2022-08-26 14:40:19',
                    updatedAt: '2022-08-26 14:40:19',
                    deletedAt: null
                }
            },
            CASE_NULL_DETAIL: null,
            POSITIVE_CASE_OUTPUT: true,
            ERROR_MESSAGE: 'User not found'
        },
        deleteUser: {
            POSITIVE_CASE_INPUT: {
                userId: 1
            },
            CASE_EXIST_DETAIL: {
                id: 1,
                email: 'user@mail.com',
                firstName: 'John',
                lastName: 'Doe',
                role: {
                    id: 1,
                    name: 'Admin',
                    description: 'Admin',
                    slug: 'admin',
                    createdAt: '2022-08-26 14:40:19',
                    updatedAt: '2022-08-26 14:40:19',
                    deletedAt: null
                }
            },
            CASE_NULL_DETAIL: null,
            POSITIVE_CASE_OUTPUT: true,
            ERROR_MESSAGE: 'User not found'
        }
    }
};

export default mockResource;
