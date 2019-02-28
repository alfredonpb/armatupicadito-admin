'use strict';

const moment = require('moment');
const jwt = require('jwt-simple');
const response = require('../shared/response');

const SECRET = process.env.SECRET_JWT;

function validate(req, res, next) {

   try {

      const headers = req.headers.authorization;

      if (!headers) {
         return response.error(res, 'No existe la cabecera de autorización', 401);
      }

      const token = headers.replace('Bearer ', '');
      const payload = jwt.decode(token, SECRET, 'HS512');

      // token expirado
      if (payload.exp <= moment.unix()) {
         return response.error(res, 'El token de seguridad ha expirado', 401);
      }

      req.userLogged = payload;

      next();

   } catch (exception) {
      console.log(`Error jwt middleware ${exception}`);
      return response.error(res, exception.message, 500);
   }

}

module.exports = { validate };
