import { body, param } from 'express-validator';

const usersRequirement = {
    createUsers: [
        body('email').isEmail(),
        body('password').isString().isLength({ min: 5 }),
        body('firstName').isString().isLength({ min: 1 }),
        body('lastName').isString().optional({ nullable: true }),
        body('roleId').isInt().optional({ nullable: true })
    ],
    getUserDetail: [param('id').isInt()],
    updateUser: [
        param('id').isInt(),
        body('firstName').isString().isLength({ min: 1 }),
        body('lastName').isString().optional({ nullable: true }),
        body('roleId').isInt().optional({ nullable: true })
    ],
    deleteUser: [param('id').isInt()]
};

export default usersRequirement;
