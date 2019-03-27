'use strict';

const db = require('../database/sequelize');

const TypeField = db.connection.define('types_fields', {
   id: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   name: {
      type: db.Sequelize.STRING
   }
});

module.exports = TypeField;
