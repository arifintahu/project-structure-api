import { Sequelize } from 'sequelize';
import Logger from '../logger';
import AppConfig from '../../../config/appConfig';

function customLog(msg: string) {
    Logger.debug(msg);
}

export const db: Sequelize = new Sequelize({
    ...AppConfig.database,
    dialect: 'postgres',
    logging: AppConfig.database.is_logging ? customLog : false
});

export default async function syncDB(): Promise<Sequelize> {
    return await db.sync();
}
