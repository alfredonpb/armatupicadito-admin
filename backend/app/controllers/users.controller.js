'use strict';

const moment = require('moment');
const bcrypt = require('bcrypt');
const response = require('../shared/response');

const services = require('../services/index');

/**
 * Registro de usuarios
 * @param {*} req [request recibidos por http]
 * @param {*} res [response respuesta http]
 */
function register(req, res) {

   try {

      const params = req.body;
      const checkEmail = services.UserService.getUserByEmail(params.email);
      
      checkEmail.then(
         (userData) => {
            if (userData) {
               return response.error(res, 'El email ya se encuentra registrado', 500);
            }  

            bcrypt.hash(params.password, 10).then((hash) => {

               params.hash = hash;
               params.now = moment();

               /** se crea al usuario */
               const User = services.UserService.create(params);

               User.then(
                  () => { 
                     return response.success(res, 'Register ok'); 
                  }
               ).catch(
                  (error) => { 
                     return response.error(res, error.message, 500); 
                  }
               );

            }).catch(
               (exception) => { 
                  return response.error(res, exception.message, 500); 
               }
            );
         }
      ).catch(
         (exception) => { 
            return response.error(res, exception.message, 500); 
         }
      );

   } catch (exception) {
      console.log(`Error en registro de usuarios ${exception}`);
      return response.error(res, exception.message, 500);
   }

}

module.exports = { register };
