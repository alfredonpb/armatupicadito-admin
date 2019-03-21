'use strict';

const db = require('../database/sequelize');
const Op = db.Sequelize.Op;

const Profile = require('./profile');

const User = db.connection.define('users', {
   id: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   name: {
      type: db.Sequelize.STRING
   },
   lastname: {
      type: db.Sequelize.STRING
   },
   email: {
      type: db.Sequelize.STRING,
      unique: true
   },
   phone: {
      type: db.Sequelize.STRING
   },
   password: {
      type: db.Sequelize.STRING
   },
   profile_id: {
      type: db.Sequelize.INTEGER
   },
   enabled: {
      type: db.Sequelize.BOOLEAN
   },
   created_at: {
      type: db.Sequelize.DATE
   },
   updated_at: {
      type: db.Sequelize.DATE
   }
}, {
   scopes: {
      distinctSuperadmin: {
         include: [
            { model: Profile, where: { id: { [Op.not]: 1 } } }
         ]
      }
   }
});

module.exports = User;
