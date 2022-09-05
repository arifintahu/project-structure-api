import { body } from 'express-validator';

const rolesRequirement = {
    createRole: [
        body('name').isString(),
        body('description').isString().optional({ nullable: true })
    ]
};

export default rolesRequirement;
