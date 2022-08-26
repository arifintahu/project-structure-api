import mainRequirement from './main';
import usersRequirement from './users';
import rolesRequirement from './roles';

export default {
    ...mainRequirement,
    ...usersRequirement,
    ...rolesRequirement
};
