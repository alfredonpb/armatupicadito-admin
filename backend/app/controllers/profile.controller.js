'use strict';

const response = require('../shared/response');

const services = require('../services/index');

const logMessage = 'profile controller';

/**
 * get de todos los perfiles
 * 
 * @param {Request} req [recibidos por http]
 * @param {Response} res [respuesta http]
 * 
 * @return  {Response} res [respuesta a front]
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

/**
 * eliminacion de perfil
 * 
 * @param {Request} req [recibidos por http]
 * @param {Response} res [respuesta http]
 * 
 * @return  {Response} res [respuesta a front]
 */
function destroy(req, res) {

   const id = Number(req.params.id);

   const Profile = services.ProfileService.destroy(id);

   Profile.then(
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
