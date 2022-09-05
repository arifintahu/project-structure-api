const mockResource = {
    RoleRepository: {
        createRole: {
            POSITIVE_CASE_INPUT: {
                name: 'Admin',
                description: 'Admin',
                slug: 'admin'
            },
            POSITIVE_CASE_OUTPUT: {
                id: 1,
                name: 'Admin',
                description: 'Admin',
                slug: 'admin',
                createdAt: '2022-08-26 14:40:19',
                updatedAt: '2022-08-26 14:40:19',
                deletedAt: null
            }
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
        },
        getRoleBySlug: {
            POSITIVE_CASE_INPUT: {
                slug: 'admin'
            },
            MODEL_OPTIONS: {
                where: {
                    slug: 'admin'
                }
            },
            POSITIVE_CASE_OUTPUT: {
                id: 1,
                name: 'Admin',
                description: 'Admin',
                slug: 'admin',
                createdAt: '2022-08-26 14:40:19',
                updatedAt: '2022-08-26 14:40:19',
                deletedAt: null
            }
        }
    },
    UserRepository: {
        createUser: {
            POSITIVE_CASE_INPUT: {
                email: 'user@mail.com',
                password:
                    '$2b$05$bnaCGMUl/IYffmo9zku7c.AVDpdkJZPt.ZEIXsKULeQglPDyRU7Di',
                firstName: 'John',
                lastName: 'Doe',
                roleId: 1
            },
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
            }
        },
        getUsers: {
            MODEL_OPTIONS: {
                attributes: ['id', 'roleId', 'firstName', 'lastName', 'email']
            },
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
            MODEL_OPTIONS: {
                attributes: ['id', 'firstName', 'lastName', 'email']
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
            }
        },
        getUserByEmail: {
            POSITIVE_CASE_INPUT: {
                email: 'user@mail.com'
            },
            MODEL_OPTIONS: {
                where: {
                    email: 'user@mail.com'
                }
            },
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
            }
        },
        updateUser: {
            POSITIVE_CASE_INPUT: {
                userId: 1,
                payload: {
                    email: 'user@mail.com',
                    firstName: 'John',
                    lastName: 'Doe',
                    roleId: 1
                }
            },
            MODEL_OPTIONS: {
                where: {
                    id: 1
                }
            },
            POSITIVE_MODEL_OUTPUT: [1],
            POSITIVE_CASE_OUTPUT: true
        },
        deleteUser: {
            POSITIVE_CASE_INPUT: {
                userId: 1
            },
            MODEL_OPTIONS: {
                where: {
                    id: 1
                }
            },
            POSITIVE_MODEL_OUTPUT: 1,
            POSITIVE_CASE_OUTPUT: true
        }
    }
};

export default mockResource;
