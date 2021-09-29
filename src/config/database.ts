import { Sequelize } from 'sequelize';

export const db: Sequelize = new Sequelize({
  host: process.env['DB_HOST'] || 'localhost',
  database: process.env['DB_NAME'] || 'lms',
  username: process.env['DB_USER'] || 'postgres',
  password: process.env['DB_PASS'] || 'postgres',
  port: parseInt(process.env['DB_PORT'], 10) || 5432,
  dialect: 'postgres',
  logging: console.log,
  timezone: 'Asia/Jakarta'
});

export default function loadSequelize(): Promise<Sequelize> {
  return db.sync();
}
