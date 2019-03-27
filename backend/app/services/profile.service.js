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

   const Profile = this.getById(id); 

   return Profile.then(
      (profile) => {

         if (profile.users.length < 1) {

            return db.connection.transaction((t) => {

               return profile.destroy({ transaction: t });
         
            }).then((result) => {
               return result;
         
            }).catch((error) => {
               throw new Error(error);
         
            });
            
         }

         throw new Error('No se puede eliminar el perfil ya que tiene usuarios asociados');
      
      }
   );

   // return db.connection.transaction((t) => {

   //    return models.Profile.destroy({ where: { id } }, { transaction: t }).then(() => {
   //       return true;
   //    });

   // }).then((result) => {
   //    return result;

   // }).catch((error) => {
   //    throw new Error(error);

   // });

}

/**
 * tipo de cancha dado su id
 * 
 * @param   {Number} id [id de tipo de cancha]
 * 
 * @return  {Promise} [Promise]
 */
function getById(id) {

   const query = models.Profile.findById(id, {
      attributes: [
         'id',
         'name'
      ],
      include: [{
         model: models.User
      }]
   });

   return query;
   
}

module.exports = {
   getAll,
   create,
   destroy,
   getById
};
