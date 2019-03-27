'use strict';

const db = require('../database/sequelize');
const models = require('../models/index');

/**
 * todos los tipos de cancha
 *
 * @return  {Promise} [Promise]
 */
function getAll() {

   const query = models.TypeField.findAll({
      order: [
         ['name', 'ASC']
      ]
   });

   return query;
   
}

/**
 * creacion de tipos de canchas
 *
 * @param {Request} req [datos para la creacion de un tipo de cancha]
 *
 * @return  {Promise} [Promise]
 */
function create(request) {

   const values = {
      name: request.name
   };

   return db.connection.transaction((t) => {

      return models.TypeField.create(values, { transaction: t }).then((typeField) => {
         return typeField;
      });

   }).then((result) => {
      return result;

   }).catch((error) => {
      throw new Error(error);

   });

}

/**
 * eliminacion de tipo de cancha
 *
 * @param {Number} id [id del tipo d cancha]
 *
 * @return  {Promise} [Promise]
 */
function destroy(id) {

   return db.connection.transaction((t) => {

      return models.TypeField.destroy({ where: { id } }, { transaction: t }).then(() => {
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
