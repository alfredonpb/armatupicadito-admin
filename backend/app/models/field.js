'use strict';

const db = require('../database/sequelize');

const Field = db.connection.define('fields', {
   id: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   name: {
      type: db.Sequelize.STRING
   },
   qt_players: {
      type: db.Sequelize.INTEGER
   },
   enabled: {
      type: db.Sequelize.BOOLEAN
   },
   type_field_id: {
      type: db.Sequelize.INTEGER
   },
   created_by: {
      type: db.Sequelize.INTEGER
   }
});

module.exports = Field;
