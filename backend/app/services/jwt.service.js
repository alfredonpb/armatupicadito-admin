'use strict';

const jwt = require('jsonwebtoken');
const moment = require('moment');

const SECRET = process.env.SECRET_JWT;

/**
 * generar token dado usuario
 * @param {User} user [objeto usuario] 
 */
function generateToken(user) {

   const payload = {
      data: user,
      iat: moment().unix(),
      exp: moment().add(30, 'd').unix()
   };

   return jwt.sign(payload, SECRET);
   
}

module.exports = { 
   generateToken 
};
