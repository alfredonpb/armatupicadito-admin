'use strict';

const MYSQL_HOST = process.env.MYSQL_HOST;
const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
const MYSQL_TABLE = process.env.MYSQL_TABLE;

const Sequelize = require('sequelize');

const connection = new Sequelize(MYSQL_TABLE, MYSQL_USER, MYSQL_PASSWORD, {
   host: MYSQL_HOST,
   dialect: 'mysql',
   operatorsAliases: false,
   define: {
      timestamps: false
   },
   timezone: 'America/Argentina/Buenos_Aires',
   pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
   }
});

module.exports = { connection, Sequelize };
