'use strict';

const db = require('../database/sequelize');
const models = require('../models/index');

/**
 * todos los perfiles
 *
 * @return  {Promise} [Promise]
 */
function getAll() {

   const query = models.Profile.scope(['distinctSuperadmin']).findAll({
      order: [
         ['name', 'ASC']
      ]
   });

   return query;
   
}

/**
 * creacion de perfil
 *
 * @param {Request} req [datos para la creacion de un perfil]
 *
 * @return  {Promise} [Promise]
 */
function create(request) {

   const values = {
      name: request.name
   };

   return db.connection.transaction((t) => {

      return models.Profile.create(values, { transaction: t }).then((user) => {
         return user;
      });

   }).then((result) => {
      return result;

   }).catch((error) => {
      throw new Error(error);

   });

}

/**
 * eliminacion de perfil
 *
 * @param {Number} id [id del perfil]
 *
 * @return  {Promise} [Promise]
 */
function destroy(id) {

   return db.connection.transaction((t) => {

      return models.Profile.destroy({ where: { id } }, { transaction: t }).then(() => {
         return true;
      });

   }).then((result) => {
      return result;

   }).catch((error) => {
      throw new Error(error);

   });

}

module.exports = {
   getAll,
   create,
   destroy
};
