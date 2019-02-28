'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');

const SECRET = process.env.SECRET_JWT;

/**
 * generar token dado usuario
 * @param {User} user 
 */
function generateToken(user) {

   const payload = {
      sub: user.id,
      fullname: `${user.nombre}${user.apellido}`,
      iat: moment().unix(),
      exp: moment().add(30, 'd').unix()
   };

   return jwt.encode(payload, SECRET);
   
}

module.exports = { 
   generateToken 
};
