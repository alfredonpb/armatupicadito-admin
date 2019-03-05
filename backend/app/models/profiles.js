'use strict';

const database = require('../database/sequelize');

const Profile = database.instanceSequelize.define('profiles', {
   id: {
      type: database.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   name: {
      type: database.Sequelize.STRING
   }

});

module.exports = Profile;
