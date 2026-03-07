import winston from 'winston';
import AppConfig from '../../config/appConfig';

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
};

const level = () => {
    return AppConfig.app.isDevelopment ? 'debug' : 'warn';
};

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'cyan',
    http: 'magenta',
    debug: 'green'
};

winston.addColors(colors);

const devFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
);

const prodFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
);

const devTransports: winston.transport[] = [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/all.log' })
];

const prodTransports: winston.transport[] = [new winston.transports.Console()];

const Logger = winston.createLogger({
    level: level(),
    levels,
    format: AppConfig.app.isDevelopment ? devFormat : prodFormat,
    transports: AppConfig.app.isDevelopment ? devTransports : prodTransports
});

export default Logger;
