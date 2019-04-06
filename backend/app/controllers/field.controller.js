'use strict';

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

module.exports = { 
   getByFilter
};
