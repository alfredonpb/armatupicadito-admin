'use strict';

function success(res, message) {
   return res.status(200).send({
      data: message
   });
}

function error(res, message, code) {
   return res.status(code).send({
      error: message,
      code
   });
}

function errorLog(res, exception, logMessage, code) {
   console.error(`Error en ${logMessage}: ${exception.stack}`);
   return this.error(res, exception.message, code);
}

module.exports = { 
   success, 
   error, 
   errorLog 
};