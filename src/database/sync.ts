import * as dotenv from 'dotenv';
dotenv.config();

import Role from '../api/models/Role';
import User from '../api/models/User';

const syncTables = () => Promise.all([User.sync(), Role.sync()]);

syncTables()
    .then((result) => console.log(result))
    .catch((error) => console.log(error))
    .finally(() => process.exit());
