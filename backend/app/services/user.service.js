'use strict';

const models = require('../models/index');
const db = require('../database/sequelize');

/**
 * get usuarios dado email  
 * @param {string} email
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

/**
 * creacion de usuario
 * @param   {request}  request  parametros para guardar usuario
 * @return  {Promise}          Promesa
 */
function create(request) {

   return db.connection.transaction((t) => {

      return models.User.create({
         name: request.name,
         lastname: request.lastname,
         email: request.email,
         password: request.hash,
         phone: request.phone,
         profile_id: request.profile_id,
         created_at: request.now,
         updated_at: request.now
      }, { transaction: t }).then((user) => {
         return user;
      });

   }).then((result) => {
      return result;

   }).catch((error) => {
      throw new Error(error);

   });

}

module.exports = {
   getUserByEmail,
   create
};
