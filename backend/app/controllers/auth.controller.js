'use strict';

const bcrypt = require('bcrypt');
const response = require('../shared/response');
const services = require('../services/index');

/**
 * login a sistema
 * @param {*} req 
 * @param {*} res 
 */
function login(req, res) {

   try {

      const params = req.body;

      if (!params.email || !params.password) {
         return response.error(res, 'Faltan datos por completar', 500);
      }   

      const user = services.UserService.getUserByEmail(params.email);

      user.then(
         (resolved) => {

            if (resolved) {
               const hash = resolved.password;
               const password = params.password;

               bcrypt.compare(password, hash).then(
                  (data) => {

                     if (data) {

                        const generatedToken = services.JwtService.generateToken(resolved);  

                        const userLogged = {
                           name: resolved.name,
                           lastname: resolved.lastname,
                           email: resolved.email,
                           phone: resolved.phone,
                           profile_id: resolved.profile_id,
                           token: generatedToken
                        };

                        return response.success(res, userLogged);

                     } 

                     return response.error(res, 'Verificar el password', 500);
                     
                  }
               );
               
            } else {
               return response.error(res, 'Datos incorrectos', 500);
            }

         },
         (rejected) => {
            return response.error(res, rejected, 500);
         }
      ).catch(
         (exception) => { 
            return response.error(res, exception.message, 500); 
         }
      );
      
   } catch (exception) {
      console.log(`Error en login ${exception}`);
      return response.error(res, exception.message, 500);
   }

}
/**
 * logout invalidar token
 * @param {*} req 
 * @param {*} res 
 */
function logout(req, res) {

}

module.exports = { 
   login,
   logout
};
