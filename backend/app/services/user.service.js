'use strict';

const models = require('../models/index');

/**
 * get usuarios dado email  
 * @param {string} email
 * 
 * @return {Promise}
 */
function getUserByEmail(email) {

   const query = models.User.findOne({
      where: {
         email
      },
      include: [{
         model: models.Profile
      }]
   });

   return query;

}

module.exports = { 
   getUserByEmail 
};
