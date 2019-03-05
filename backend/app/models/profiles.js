'use strict';

const db = require('../database/sequelize');

const Profile = db.connection.define('profiles', {
   id: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   name: {
      type: db.Sequelize.STRING
   }

});

module.exports = Profile;
