const AppConfig = {
    app: {
        name: process.env.APP_NAME,
        server: process.env.SERVER,
        isDevelopment: ['development', 'dev', 'local'].includes(
            <string>process.env.SERVER
        ),
        port: parseInt(<string>process.env.PORT, 10) || 3000,
        apiVersion: process.env.API_VERSION || 'v1',
        secret: process.env.SECRET || 'j!89nKO5as&Js'
    },
    cors: {
        origin: process.env.CORS_ORIGIN || '*'
    },
    rateLimit: {
        windowMs:
            parseInt(<string>process.env.RATE_LIMIT_WINDOW_MS, 10) ||
            15 * 60 * 1000,
        max: parseInt(<string>process.env.RATE_LIMIT_MAX, 10) || 100
    },
    db: {
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port: parseInt(<string>process.env.DB_PORT, 10) || 5432,
        dialect: process.env.DB_DIALECT || 'postgres',
        timezone: process.env.DB_TIMEZONE || 'Asia/Jakarta',
        isLogging: process.env.DB_LOG === 'true',
        pool: {
            min: parseInt(<string>process.env.DB_POOL_MIN, 10) || 2,
            max: parseInt(<string>process.env.DB_POOL_MAX, 10) || 10,
            acquire: 30000,
            idle: 10000
        }
    }
};

export default Object.freeze(AppConfig);
