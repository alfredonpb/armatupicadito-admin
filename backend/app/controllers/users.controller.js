'use strict';

const moment = require('moment');
const bcrypt = require('bcrypt');
const response = require('../shared/response');

const services = require('../services/index');

const logMessage = 'user controller';

/**
 * get list of users by filter
 *
 * @param   {Request}  req  request
 * @param   {Response}  res  response
 *
 * @return  {Response}       response to front
 */
function getByFilter(req, res) {

   try {
      
      const User = services.UserService.getByFilter(req.query);

      User.then(
         (userData) => {
            return response.success(res, userData); 
         }
      ).catch(
         (exception) => { 
            return response.errorLog(res, exception, `${logMessage} -> getByFilter`, 500); 
         }
      );

   } catch (exception) {
      return response.errorLog(res, exception, `${logMessage} -> getByFilter`, 500); 
   }

}

/**
 * register of users
 * 
 * @param   {Request}  req  request
 * @param   {Response}  res  response
 *
 * @return  {Response}       response to front
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
                  (exception) => { 
                     return response.errorLog(res, exception, `${logMessage} -> register`, 500);
                  }
               );

            }).catch(
               (exception) => { 
                  return response.errorLog(res, exception, `${logMessage} -> register`, 500);
               }
            );
         }
      ).catch(
         (exception) => { 
            return response.errorLog(res, exception, `${logMessage} -> register`, 500); 
         }
      );

   } catch (exception) {
      return response.errorLog(res, exception, `${logMessage} -> register`, 500);
   }

}

/**
 * get list of users by filter
 *
 * @param   {Request}  req  request
 * @param   {Response}  res  response
 *
 * @return  {Response}       response to front
 */
function update(req, res) {

   try {

      const params = req.body;
      params.id = Number(req.params.id);
      params.now = moment();

      const User = services.UserService.update(params, params.id);

      User.then(
         (user) => { 

            const findUser = services.UserService.getById(user.id);
            findUser.then(
               (userData) => {
                  return response.success(res, userData); 
               }
            ).catch(
               (exception) => { 
                  return response.errorLog(res, exception, `${logMessage} -> update`, 500);
               }
            );
            
         }
      ).catch(
         (exception) => { 
            return response.errorLog(res, exception, `${logMessage} -> update`, 500);
         }
      );
      
   } catch (exception) {
      return response.errorLog(res, exception, `${logMessage} -> update`, 500);
   }

}

module.exports = { 
   getByFilter, 
   register,
   update
};
