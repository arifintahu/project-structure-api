import dotenv from 'dotenv';
dotenv.config();

import Role from '../api/models/Role';
import User from '../api/models/User';

const syncTables = async () => {
    await Role.sync();
    await User.sync();
};

syncTables()
    .then((result) => console.log(result))
    .catch((error) => console.log(error))
    .finally(() => process.exit());
