'use strict';

const database = require('../database/sequelize');

const User = database.instanceSequelize.define('users', {
   id: {
      type: database.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   name: {
      type: database.Sequelize.STRING
   },
   lastname: {
      type: database.Sequelize.STRING
   },
   email: {
      type: database.Sequelize.STRING
   },
   phone: {
      type: database.Sequelize.STRING
   },
   password: {
      type: database.Sequelize.STRING
   },
   profile_id: {
      type: database.Sequelize.INTEGER
   },
   created_at: {
      type: database.Sequelize.DATE
   },
   updated_at: {
      type: database.Sequelize.DATE
   }
});

module.exports = User;
