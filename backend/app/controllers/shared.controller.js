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

   /** itero por los records */
   params.records.forEach((record) => {

      if (record) {

         const data = { name: record.trim() };

         /** si la entidad a crear es perfiles */
         if (params.master_entitie === 'profile') {

            const Profile = services.ProfileService.create(data);

            Profile.then(
               () => { 
                  return response.success(res, 'Register ok'); 
               }
            ).catch(
               (exception) => { 
                  return response.errorLog(res, exception, `${logMessage} -> register`, 500);
               }
            );
            
         }

         /** si la entidad a crear es tipos de cancha */
         if (params.master_entitie === 'type_field') {

            const TypeField = services.TypeFieldService.create(data);

            TypeField.then(
               () => { 
                  return response.success(res, 'Register ok'); 
               }
            ).catch(
               (exception) => { 
                  return response.errorLog(res, exception, `${logMessage} -> register`, 500);
               }
            );

         }

      }
      
   });

}

function createProfile() {

}


module.exports = { 
   createEntitie 
};
