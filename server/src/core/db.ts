import { Sequelize } from 'sequelize';

export const db = new Sequelize(
  process.env.DB_DATABASE!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    port: +process.env.DB_PORT!,
    host: process.env.DB_HOST,
    dialect: 'postgres'
  }
);