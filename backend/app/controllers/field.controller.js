'use strict';

const moment = require('moment');

const response = require('../shared/response');

const services = require('../services/index');

const logMessage = 'field controller';

/**
 * listado de canchas dado un filtrado
 *
 * @param {Request} req [recibidos por http]
 * @param {Response} res [respuesta http]
 * 
 * @return  {Response} res [respuesta a front]
 */
function getByFilter(req, res) {

   try {
      
      const Field = services.FieldService.getByFilter(req.query);

      Field.then(
         (FieldData) => {
            return response.success(res, FieldData); 
         }
      ).catch(
         (exception) => { 
            return response.errorLog(res, exception, `${logMessage} -> getByFilter`, 500); 
         }
      );

   } catch (exception) {
      return response.errorLog(res, exception, `${logMessage} -> getByFilter`, 500); 
   }

}

/**
 * Creacion de canchas
 * 
 * @param {Request} req [request recibidos por http]
 * @param {Request} res [response respuesta http]
 */
function create(req, res) {

   const params = req.body;
   params.now = moment();
   params.created_by = req.userActive.data.id;

   const Field = services.FieldService.create(params);

   Field.then(
      () => { 
         return response.success(res, 'Register ok'); 
      }
   ).catch(
      (exception) => { 
         return response.errorLog(res, exception, `${logMessage} -> register`, 500);
      }
   );

}

/**
 * actualizacion de canchas
 *
 * @param {Request} req [recibidos por http]
 * @param {Response} res [respuesta http]
 * 
 * @return  {Response} res [respuesta a front]
 */
function update(req, res) {

   try {

      const params = req.body;
      params.id = Number(req.params.id);
      params.now = moment();

      const Field = services.FieldService.update(params, params.id);

      Field.then(
         (field) => { 

            const findField = services.FieldService.getById(field.id);
            findField.then(
               (fieldData) => {
                  return response.success(res, fieldData); 
               }
            ).catch(
               (exception) => { 
                  return response.errorLog(res, exception, `${logMessage} -> update`, 500);
               }
            );
            
         }
      ).catch(
         (exception) => { 
            return response.errorLog(res, exception, `${logMessage} -> update`, 500);
         }
      );
      
   } catch (exception) {
      return response.errorLog(res, exception, `${logMessage} -> update`, 500);
   }

}

module.exports = { 
   getByFilter,
   create,
   update
};
