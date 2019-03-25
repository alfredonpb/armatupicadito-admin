'use strict';

const response = require('../shared/response');

const services = require('../services/index');

const logMessage = 'shared controller';

/**
 * Creacion de entidad
 * 
 * @param {Request} req [request recibidos por http]
 * @param {Request} res [response respuesta http]
 */
function createEntitie(req, res) {

   const params = req.body;

   /** se determina a que entidad se va a crear */
   if (params.master_entitie === 'profile') {

      /** itero por los perfiles */
      params.records.forEach((record) => {

         if (record) {

            const data = { name: record.trim() };
            const Profile = services.ProfileService.create(data);

            Profile.then(
               () => { 
                  
               }
            ).catch(
               (exception) => { 
                  return response.errorLog(res, exception, `${logMessage} -> register`, 500);
               }
            );

         }
         
      });

      return response.success(res, 'Register ok'); 
      
   }

}


module.exports = { 
   createEntitie 
};
