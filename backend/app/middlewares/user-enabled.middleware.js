'use strict';

const response = require('../shared/response');

const services = require('../services/index');

/**
 * verificador de token valido para peticiones
 *
 * @param {*} req [request recibidos por http]
 * @param {*} res [response respuesta http]
 * @param {*} next [sequir con la peticion]
 *
 */
function validEnabled(req, res, next) {

   try {

      const userActive = req.userActive;
      const User = services.UserService.getById(userActive.data.id);

      User.then(
         (data) => { 

            if (!data.enabled) {
               return response.error(res, 'El usuario está deshabilitado', 401);
            }

            next();

         }
      ).catch(
         (error) => { 
            return response.error(res, error.message, 500); 
         }
      );

   } catch (exception) {
      console.log(`Error jwt valid enabled ${exception}`);
      return response.error(res, exception.message, 500);
   }

}

module.exports = { validEnabled };
