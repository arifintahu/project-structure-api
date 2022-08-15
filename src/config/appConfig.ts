const AppConfig = {
    app: {
        name: <string>process.env.APP_NAME,
        server: process.env.SERVER || 'development',
        port: parseInt(<string>process.env.PORT, 10) || 3000,
        api: <string>process.env.API || 'api/v1',
        secret: <string>process.env.SECRET || 'j!89nKO5as&Js'
    },
    database: {
        host: <string>process.env.DB_HOST,
        name: <string>process.env.DB_NAME,
        username: <string>process.env.DB_USER,
        password: <string>process.env.DB_PASSWORD,
        port: parseInt(<string>process.env.DB_PORT, 10) || 5432,
        timezone: <string>process.env.DB_TIMEZONE || 'Asia/Jakarta',
        is_logging: <string>process.env.DB_LOG === 'true'
    }
};

export default AppConfig;
