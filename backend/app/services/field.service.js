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

   /** whern enabled is received */
   let enabledWhere = { enabled: true };
   if (filter.enabled) {
      enabledWhere = { enabled: filter.enabled == 'true' ? true : false };
   }

   const query = models.Field.findAll({
      attributes: [
         'id',
         'name',
         'qt_players',
         'enabled',
         'type_field_id'
      ],
      where: {
         [Op.or]: [
            { name: { [Op.like]: `%${criteriaSearch}%` } },
            { qt_players: { [Op.like]: `%${criteriaSearch}%` } } 
         ],
         [Op.and]: [
            enabledWhere
         ]
      },
      include: [{ 
         model: models.TypeField
      }],
      order: [
         ['name', 'ASC']
      ],
      limit: limitPage,
      offset: offsetPage
   });

   return query;

}

/**
 * cancha dado su id
 * 
 * @param   {Number} id [id de cancha]
 * 
 * @return  {Promise} [Promise]
 */
function getById(id) {

   const query = models.Field.findById(id, {
      attributes: [
         'id',
         'name',
         'qt_players',
         'enabled',
         'type_field_id'
      ],
      include: [{ 
         model: models.TypeField
      }]
   });

   return query;
   
}

/**
 * creacion de canchas
 *
 * @param {Request} req [datos para la creacion de un tipo de cancha]
 *
 * @return  {Promise} [Promise]
 */
function create(req) {

   const values = {
      name: req.name,
      qt_players: req.qt_players,
      enabled: req.enabled,
      type_field_id: Number(req.type_field_id),
      created_by: Number(req.created_by),
      created_at: req.now,
      updated_at: req.now
   };

   return db.connection.transaction((t) => {

      return models.Field.create(values, { transaction: t }).then((Field) => {
         return Field;
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
function update(req, id) {

   const values = {
      name: req.name,
      qt_players: req.qt_players,
      type_field_id: Number(req.type_field_id),
      enabled: req.enabled,
      updated_at: req.now
   };

   const Field = this.getById(id);

   return Field.then(
      (field) => {
         return db.connection.transaction((t) => {

            return field.update(values, { transaction: t });
      
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
   getById,
   create,
   update
};
