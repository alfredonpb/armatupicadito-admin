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
function getAll(req, res) {

   try {

      const Profiles = services.ProfileService.getAll();

      Profiles.then(
         (profilesData) => {
            return response.success(res, profilesData);
         }
      ).catch(
         (exception) => { 
            return response.error(res, exception.message, 500); 
         }
      );
      
   } catch (exception) {
      console.log(`Error en profile get all ${exception}`);
      return response.error(res, exception.message, 500);
   }

}

module.exports = { getAll };
