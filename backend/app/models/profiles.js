'use strict';

const database = require('../database/sequelize');

const Profile = database.instanceSequelize.define('profiles', {
   name: {
      type: database.Sequelize.STRING
   }
});

module.exports = Profile;
