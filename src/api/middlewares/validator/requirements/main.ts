import { body } from 'express-validator';

const mainRequirement = {
    login: [
        body('email').isEmail(),
        body('password').isString().isLength({ min: 5 })
    ],
    signup: [
        body('email').isEmail(),
        body('password').isString().isLength({ min: 5 }),
        body('firstName').isString().isLength({ min: 1 }),
        body('lastName').isString().optional({ nullable: true })
    ]
};

export default mainRequirement;
