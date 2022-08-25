import * as dotenv from 'dotenv';
dotenv.config();

import { User, Role } from '../api/models';

const syncTables = () => Promise.all([User.sync(), Role.sync()]);

syncTables()
    .then((result) => console.log(result))
    .catch((error) => console.log(error))
    .finally(() => process.exit());
