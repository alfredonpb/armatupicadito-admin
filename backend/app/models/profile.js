'use strict';

const db = require('../database/sequelize');
const Op = db.Sequelize.Op;

const Profile = db.connection.define('profiles', {
   id: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   name: {
      type: db.Sequelize.STRING
   }
}, {
   scopes: {
      distinctSuperadmin: {
         where: { id: { [Op.not]: 1 } }
      }
   }
});

module.exports = Profile;
