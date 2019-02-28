'use strict';

const moment = require('moment');
const bcrypt = require('bcrypt');
const response = require('../shared/response');

const models = require('../models/index');
const services = require('../services/index');

/**
 * Registro de usuarios
 * @param {*} req 
 * @param {*} res 
 */
function register(req, res) {

   try {

      const params = req.body;
      const checkEmailPromise = services.UserService.getUserByEmail(params.email);
      
      checkEmailPromise.then(
         (resolved) => {
            if (resolved) {
               return response.error(res, 'El email ya se encuentra registrado', 500);
            }  

            bcrypt.hash(params.password, 10).then((hash) => {

               const user = models.User.build({
                  name: params.name,
                  lastname: params.lastname,
                  email: params.email,
                  password: hash,
                  phone: params.phone,
                  profile_id: 1,
                  created_at: moment(),
                  updated_at: moment()
               });

               user.save().then(
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
      console.log(`Error en registro de usuarios ${exception}`);
      return response.error(res, exception.message, 500);
   }

}

module.exports = { register };
