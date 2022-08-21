import { Sequelize, Dialect } from 'sequelize';
import Logger from '../utils/logger';
import AppConfig from '../config/appConfig';

function customLog(msg: string) {
    Logger.debug(msg);
}

export const db: Sequelize = new Sequelize({
    host: AppConfig.db.host,
    database: AppConfig.db.database,
    username: AppConfig.db.username,
    password: AppConfig.db.password,
    port: AppConfig.db.port,
    timezone: AppConfig.db.timezone,
    dialect: AppConfig.db.dialect as Dialect,
    logging: AppConfig.db.isLogging ? customLog : false
});
