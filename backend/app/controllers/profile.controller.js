'use strict';

const response = require('../shared/response');

const services = require('../services/index');

const logMessage = 'profile controller';

/**
 * Registro de usuarios
 * @param {*} req [request recibidos por http]
 * @param {*} res [response respuesta http]
 */
function getAll(req, res) {

   try {

      const Profiles = services.ProfileService.getAll();

      Profiles.then(
         (profilesData) => {
            return response.success(res, profilesData);
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

module.exports = { getAll };
