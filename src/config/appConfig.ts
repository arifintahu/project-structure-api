import * as dotenv from 'dotenv';

dotenv.config();

const AppConfig = {
    app: {
        name: process.env.APP_NAME,
        server: process.env.SERVER || 'development',
        isDevelopment: process.env.SERVER === 'development' ? true : false,
        port: parseInt(<string>process.env.PORT, 10) || 3000,
        apiVersion: process.env.API_VERSION || 'v1',
        secret: process.env.SECRET || 'j!89nKO5as&Js'
    },
    db: {
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port: parseInt(<string>process.env.DB_PORT, 10) || 5432,
        dialect: process.env.DB_DIALECT || 'postgres',
        timezone: process.env.DB_TIMEZONE || 'Asia/Jakarta',
        isLogging: process.env.DB_LOG === 'true'
    }
};

export default Object.freeze(AppConfig);
