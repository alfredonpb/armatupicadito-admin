'use strict';

const models = require('../models/index');

/**
 * get all profiles

 * @return  {Promise}      Promise
 */
function getAll() {

   const query = models.Profile.findAll({
      order: [
         ['name', 'ASC']
      ]
   });

   return query;
   
}

module.exports = {
   getAll
};
