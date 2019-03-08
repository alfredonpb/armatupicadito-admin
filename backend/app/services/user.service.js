'use strict';

const models = require('../models/index');
const db = require('../database/sequelize');
const Op = db.Sequelize.Op;

const LIMIT_PAGE = process.env.LIMIT_PAGE;

/**
 * get list of users by filter
 *
 * @param   {Request}  filter  query params
 *
 * @return  {Premise}          promise
 */
function getByFilter(filter) {

   const limitPage = Number(LIMIT_PAGE);
   const offsetPage = (filter.page * limitPage);

   const criteria = filter.search ? filter.search : '';

   const query = models.User.findAll({
      where: {
         name: {
            [Op.like]: `%${criteria}%`
         }
      },
      include: [{
         model: models.Profile
      }],
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
 * get users by email 
 * 
 * @param {string} email email of users
 * 
 * @return {Promise}    Promise
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
 * get user by id
 * 
 * @param   {number}  id  id of user
 * 
 * @return  {Promise}      Promise
 */
function getById(id) {

   const query = models.User.findById(id);

   return query;
   
}

/**
 * create users by params http
 * 
 * @param   {Request}  request  http params
 * 
 * @return  {Promise}          Promise
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
         enabled: request.enabled,
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
   getByFilter,
   getUserByEmail,
   getById,
   create
};
