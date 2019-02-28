'use strict';

const models = require('../models/index');

/**
 * get usuarios dado email  
 * @param {string} email
 * 
 * @return {Promise}
 */
function getUserByEmail(email) {

   const promise = new Promise((resolve, reject) => {

      models.User.findOne({
         where: {
            email
         }
      }).then(
         (data) => {
            resolve(data);
         }
      ).catch(
         (error) => {
            reject(error);
         }
      );

   });

   return promise;

}

module.exports = { 
   getUserByEmail 
};
