'use strict';

const models = require('../models/index');
const db = require('../database/sequelize');
const Op = db.Sequelize.Op;

/**
 * get all profiles

 * @return  {Promise}      Promise
 */
function getAll() {

   const query = models.Profile.findAll({
      where: {
         id: { [Op.not]: 1 }
      },
      order: [
         ['name', 'ASC']
      ]
   });

   return query;
   
}

module.exports = {
   getAll
};
