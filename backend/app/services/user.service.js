'use strict';

const models = require('../models/index');
const db = require('../database/sequelize');
const Op = db.Sequelize.Op;

const LIMIT_PAGE = process.env.LIMIT_PAGE;

/**
 * get usuarios dado filtrado
 *
 * @param {Request} filter [request con objecto para filtrado]
 *
 * @return  {Promise} [Promise]
 */
function getByFilter(filter) {

   const limitPage = Number(LIMIT_PAGE);
   const offsetPage = (filter.page * limitPage);

   const criteriaSearch = filter.search ? filter.search : '';

   /** when profile is received */
   const profile = Number(filter.profile);
   let profileWhere = '';

   if (profile > 0) {
      profileWhere = { profile_id: profile };
   }

   /** whern enabled is received */
   let enabledWhere = { enabled: true };
   if (filter.enabled) {
      enabledWhere = { enabled: filter.enabled == 'true' ? true : false };
   }

   const query = models.User.scope(['distinctSuperadmin']).findAll({
      attributes: [
         'id',
         'name',
         'lastname',
         'email',
         'phone',
         'profile_id',
         'enabled'
      ],
      where: {
         [Op.or]: [
            { name: { [Op.like]: `%${criteriaSearch}%` } },
            { lastname: { [Op.like]: `%${criteriaSearch}%` } },
            { email: { [Op.like]: `%${criteriaSearch}%` } },
            { phone: { [Op.like]: `%${criteriaSearch}%` } }
         ],
         [Op.and]: [
            profileWhere,
            enabledWhere
         ]
      },
      order: [
         ['name', 'ASC'],
         ['lastname', 'ASC']
      ],
      limit: limitPage,
      offset: offsetPage
   });

   return query;

}

/**
 * usuarios dado su email 
 * 
 * @param {String} email [email de usuario a consultar]
 * 
 * @return  {Promise} [Promise]
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
 * usuario dado su id
 * 
 * @param   {Number} id [id de usuario]
 * 
 * @return  {Promise} [Promise]
 */
function getById(id) {

   const query = models.User.findById(id, {
      attributes: [
         'id',
         'name',
         'lastname',
         'email',
         'phone',
         'profile_id',
         'enabled'
      ],
      include: [{
         model: models.Profile
      }]
   });

   return query;
   
}

/**
 * creacion de usuarios
 * 
 * @param   {Request}  req [datos para creacion de usuario]
 * 
 * @return  {Promise} [Promise]
 */
function create(req) {

   const values = {
      name: req.name,
      lastname: req.lastname,
      email: req.email,
      password: req.hash,
      phone: req.phone,
      profile_id: Number(req.profile_id),
      enabled: req.enabled,
      created_at: req.now,
      updated_at: req.now
   };

   return db.connection.transaction((t) => {

      return models.User.create(values, { transaction: t }).then((user) => {
         return user;
      });

   }).then((result) => {
      return result;

   }).catch((error) => {
      throw new Error(error);

   });

}

/**
 * modificacion de usuario dado su id
 * 
 * @param   {Request} req [datos para actualizacion de usuario]
 * 
 * @param   {number} id [id de usaurio]
 * 
 * @return  {Promise} [Promise]
 */
function update(request, id) {

   const values = {
      name: request.name,
      lastname: request.lastname,
      email: request.email,
      phone: request.phone,
      profile_id: Number(request.profile_id),
      enabled: request.enabled,
      created_at: request.now,
      updated_at: request.now
   };

   const User = this.getById(id);

   return User.then(
      (user) => {
         return db.connection.transaction((t) => {

            return user.update(values, { transaction: t });
      
         }).then((result) => {
            return result;
      
         }).catch((error) => {
            throw new Error(error);
      
         });
      }
   );

}

module.exports = {
   getByFilter,
   getUserByEmail,
   getById,
   create,
   update
};
