'use strict';

const response = require('../shared/response');

const services = require('../services/index');

const logMessage = 'superadmin middleware';

/**
 * verificador de token valido para peticiones
 *
 * @param {Request} req [recibidos por http]
 * @param {Response} res [respuesta http]
 * @param {Next} next [sequir con la peticion]
 */
function verifySuperadmin(req, res, next) {

   try {

      const userActive = req.userActive;
      const User = services.UserService.getById(userActive.data.id);

      User.then(
         (userData) => { 

            if (userData.profile.name != 'Superadmin') {
               return response.error(res, 'El usuario no tiene permisos para realizar ésta operación', 403);
            }

            next();

         }
      ).catch(
         (exception) => { 
            return response.errorLog(res, exception, `${logMessage} -> verifySuperadmin`, 500); 
         }
      );

   } catch (exception) {
      return response.errorLog(res, exception, `${logMessage} -> verifySuperadmin`, 500); 
   }

}

module.exports = { 
   verifySuperadmin 
};
