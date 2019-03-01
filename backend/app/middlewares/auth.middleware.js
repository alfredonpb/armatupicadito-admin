'use strict';

const moment = require('moment');
const jwt = require('jsonwebtoken');
const response = require('../shared/response');

const SECRET = process.env.SECRET_JWT;

/**
 * verificador de token valido para peticiones
 *
 * @param {*} req [request recibidos por http]
 * @param {*} res [response respuesta http]
 * @param {*} next [sequir con la peticion]
 *
 */
function validToken(req, res, next) {

   try {

      const headers = req.headers.authorization;

      if (!headers) {
         return response.error(res, 'No existe la cabecera de autorización', 401);
      }

      const token = headers.replace('Bearer ', '');

      jwt.verify(token, SECRET, (error, decoded) => {
         if (error) {
            response.error(res, `${error.name}: ${error.message}`, 401);
         }
         if (decoded) {
            // token expirado
            if (decoded.exp <= moment.unix()) {
               return response.error(res, 'El token de seguridad ha expirado', 401);
            }

            req.userActive = decoded;
         }
      });

      next();

   } catch (exception) {
      console.log(`Error jwt middleware ${exception}`);
      return response.error(res, exception.message, 500);
   }

}

module.exports = { validToken };
