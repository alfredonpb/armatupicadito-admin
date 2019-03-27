'use strict';

const response = require('../shared/response');

const services = require('../services/index');

const logMessage = 'TypeField controller';

/**
 * get de todos los tipos de canchas
 * 
 * @param {Request} req [recibidos por http]
 * @param {Response} res [respuesta http]
 * 
 * @return  {Response} res [respuesta a front]
 */
function getAll(req, res) {

   try {

      const TypeFields = services.TypeFieldService.getAll();

      TypeFields.then(
         (typeFieldData) => {
            return response.success(res, typeFieldData);
         }
      ).catch(
         (exception) => { 
            return response.errorLog(res, exception, `${logMessage} -> getAll`, 500); 
         }
      );
      
   } catch (exception) {
      return response.errorLog(res, exception, `${logMessage} -> getAll`, 500); 
   }

}

/**
 * eliminacion de tipo de cancha
 * 
 * @param {Request} req [recibidos por http]
 * @param {Response} res [respuesta http]
 * 
 * @return  {Response} res [respuesta a front]
 */
function destroy(req, res) {

   const id = Number(req.params.id);

   const TypeField = services.TypeFieldService.destroy(id);

   TypeField.then(
      () => {
         return response.success(res, 'Destroy ok');
      }
   ).catch(
      (exception) => { 
         return response.errorLog(res, exception, `${logMessage} -> delete`, 500); 
      }
   );

}

module.exports = { 
   getAll, 
   destroy
};
