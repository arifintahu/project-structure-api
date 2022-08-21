import AppConfig from '../config/appConfig';
import { User, Role } from '../api/models';

const isDevelopment = AppConfig.app.isDevelopment;

const initDatabase = () =>
    Promise.all([
        User.sync({ alter: isDevelopment }),
        Role.sync({ alter: isDevelopment })
    ]);

export default initDatabase;
